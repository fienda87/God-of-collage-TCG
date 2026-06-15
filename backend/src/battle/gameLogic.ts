import { nanoid } from 'nanoid';
import type { ActiveCard, BattleAction, CardData, GameState, PlayerState } from './types';
import { TURN_TIME_LIMIT } from './types';
import { buildStandardDeck, getCardById } from './cardDatabase';
import { getGameState, updateGameState } from './gameState';


export type AttackResult = {
  damage: number;
  isWeakness: boolean;
  newHP: number;
  koOccurred: boolean;
  pointsAwarded: number;
  ngulangPoints: Record<string, number>;
};

export type BenchTarget = 'active' | 0 | 1 | 2;

const WEAKNESS_MAP: Record<string, string> = {
  Ambis: 'Santuy',
  Santuy: 'Bucin',
  Bucin: 'Ambis',
};

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createActiveCard(card: CardData): ActiveCard {
  return {
    instanceId: nanoid(),
    cardData: {
      ...card,
      skills: card.skills.map((skill) => ({ ...skill })),
    },
    currentHP: card.hp,
    attachedSKS: 0,
    evolvedThisTurn: false,
  };
}

export function getPlayer(state: GameState, playerId: string): PlayerState {
  const player = state.players[playerId];
  if (!player) {
    throw new Error('Player tidak ditemukan');
  }
  return player;
}

export function getOpponentId(state: GameState, playerId: string): string {
  const [hostId, guestId] = state.playerOrder;
  if (playerId === hostId) return guestId;
  if (playerId === guestId) return hostId;
  throw new Error('Player tidak ada di room');
}

export function setupPlayerDecks(state: GameState, customDecks: Record<string, any[]> = {}): void {
  for (const playerId of Object.keys(state.players)) {
    const customDeckRaw = customDecks[playerId] || [];
    let flatDeck: CardData[] = [];

    if (customDeckRaw.length > 0) {
      customDeckRaw.forEach((c: any) => {
        // Expand based on quantity
        for (let i = 0; i < c.quantity; i++) {
          const baseCard = getCardById(c.cardId);
          if (baseCard) {
             flatDeck.push(baseCard);
          }
        }
      });
    } else {
      flatDeck = buildStandardDeck();
    }

    const shuffledDeck = shuffle(flatDeck);
    const player = getPlayer(state, playerId);
    player.deck = shuffledDeck;
    player.hand = [];
  }
}

export function initiateCoinFlip(io: any, roomId: string, onFirstPlayerDecided?: (firstPlayerId: string) => void): void {
  // Update phase
  updateGameState(roomId, (state) => {
    state.phase = 'coin_flip';
  });
  
  const state = getGameState(roomId);
  if (state) {
    io.to(roomId).emit('game_state_sync', state);
  }
  
  io.to(roomId).emit('coin_flip_start');
  
  setTimeout(() => {
    const firstPlayerIndex = Math.random() > 0.5 ? 0 : 1;
    const state = getGameState(roomId);
    if (!state) return;
    
    const firstPlayerId = state.playerOrder[firstPlayerIndex];
    io.to(roomId).emit('coin_flip_result', {
      firstPlayerId,
      message: `${firstPlayerIndex === 0 ? 'Host' : 'Guest'} goes first!`,
    });
    
    if (onFirstPlayerDecided) {
      onFirstPlayerDecided(firstPlayerId);
    }
    
    setTimeout(() => {
      initialDraw(io, roomId, firstPlayerId);
    }, 2000);
  }, 3000);
}

export function initialDraw(io: any, roomId: string, firstPlayerId: string): void {
  updateGameState(roomId, (state) => {
    state.phase = 'setup';
    state.currentTurnPlayerId = firstPlayerId;
    
    for (const playerId of state.playerOrder) {
      const player = getPlayer(state, playerId);
      // Draw 5 cards
      const hand = player.deck.splice(0, 5);
      player.hand = hand;
    }
  });
  
  const gameState = getGameState(roomId);
  if (gameState) {
    io.to(roomId).emit('game_state_sync', gameState);
  }
}

export function removeCardFromHand(player: PlayerState, cardId: string): CardData {
  const index = player.hand.findIndex((card) => card.id === cardId);
  if (index === -1) {
    throw new Error('Kartu tidak ada di hand');
  }
  return player.hand.splice(index, 1)[0];
}

export function getBoardCard(
  player: PlayerState,
  target: BenchTarget
): ActiveCard | null {
  if (target === 'active') {
    return player.active;
  }
  return player.bench[target];
}

export function setBoardCard(
  player: PlayerState,
  target: BenchTarget,
  card: ActiveCard | null
): void {
  if (target === 'active') {
    player.active = card;
    return;
  }
  player.bench[target] = card;
}

export function countFilledBenchSlots(player: PlayerState): number {
  return player.bench.filter((slot) => slot !== null).length;
}

export function hasAnyBenchCard(player: PlayerState): boolean {
  return player.bench.some((slot) => slot !== null);
}

export function resetTurnFlags(player: PlayerState): void {
  player.hasAttachedSKSThisTurn = false;
  player.hasRetreatedThisTurn = false;
}

export function resetEvolvedFlags(player: PlayerState): void {
  if (player.active) {
    player.active.evolvedThisTurn = false;
  }
  for (let i = 0; i < player.bench.length; i++) {
    if (player.bench[i]) {
      player.bench[i]!.evolvedThisTurn = false;
    }
  }
}

export function drawCardForPlayer(player: PlayerState): CardData | null {
  if (player.deck.length === 0) {
    return null;
  }
  const card = player.deck.shift()!;
  player.hand.push(card);
  return card;
}

export function resolveAttack(
  attacker: ActiveCard,
  defender: ActiveCard,
  skillIndex: number
): { damage: number; isWeakness: boolean; newHP: number } {
  const skill = attacker.cardData.skills[skillIndex];
  if (!skill) {
    throw new Error('Skill tidak ditemukan');
  }
  if (attacker.attachedSKS < skill.sksCost) {
    throw new Error('SKS tidak cukup');
  }
  if (attacker.evolvedThisTurn) {
    throw new Error('Baru evolve, tidak bisa attack');
  }

  let damage = skill.damage;
  const isWeakness =
    WEAKNESS_MAP[attacker.cardData.element] === defender.cardData.element;
  if (isWeakness) {
    damage += 20;
  }

  defender.currentHP -= damage;

  return { damage, isWeakness, newHP: defender.currentHP };
}

export function checkKO(card: ActiveCard | null): boolean {
  return card !== null && card.currentHP <= 0;
}

export function checkWin(state: GameState): string | null {
  const playerIds = Object.keys(state.players);
  for (const playerId of playerIds) {
    const opponentId = getOpponentId(state, playerId);
    if (state.players[opponentId].ngulangPoints >= 3) {
      return opponentId;
    }
  }
  return null;
}

export function applyKO(
  state: GameState,
  defeatedPlayerId: string,
  defeatedCard: ActiveCard
): { pointsAwarded: number; opponentId: string } {
  const opponentId = getOpponentId(state, defeatedPlayerId);
  const opponent = getPlayer(state, opponentId);
  const defeatedPlayer = getPlayer(state, defeatedPlayerId);

  const pointsAwarded = defeatedCard.cardData.isEX ? 2 : 1;
  opponent.ngulangPoints += pointsAwarded;

  defeatedPlayer.koZone.push({
    ...defeatedCard.cardData,
    skills: defeatedCard.cardData.skills.map((skill) => ({ ...skill })),
  });
  defeatedPlayer.active = null;

  return { pointsAwarded, opponentId };
}

export function promoteBenchToActive(
  player: PlayerState,
  benchIndex: number
): ActiveCard {
  const benchCard = player.bench[benchIndex];
  if (!benchCard) {
    throw new Error('Slot bench kosong');
  }
  player.bench[benchIndex] = null;
  player.active = benchCard;
  return benchCard;
}

export function advanceTurn(state: GameState): void {
  const nextPlayerId = getOpponentId(state, state.currentTurnPlayerId);
  const currentPlayer = getPlayer(state, state.currentTurnPlayerId);
  const nextPlayer = getPlayer(state, nextPlayerId);

  resetEvolvedFlags(currentPlayer);
  state.currentTurnPlayerId = nextPlayerId;
  state.turnNumber += 1;
  resetTurnFlags(nextPlayer);
  state.turnTimeLeft = TURN_TIME_LIMIT;
  state.turnStartTime = Date.now();
}

export function pickRandomFirstPlayer(state: GameState): string {
  const [hostId, guestId] = state.playerOrder;
  return Math.random() < 0.5 ? hostId : guestId;
}

export function getNgulangPointsSnapshot(state: GameState): Record<string, number> {
  const snapshot: Record<string, number> = {};
  for (const playerId of Object.keys(state.players)) {
    snapshot[playerId] = state.players[playerId].ngulangPoints;
  }
  return snapshot;
}

export function addBattleLog(state: GameState, action: BattleAction): void {
  state.battleLog.push(action);
}
