import type { GameState, PlayerState } from './types';
import { TURN_TIME_LIMIT } from './types';

const BENCH_SIZE = 3;

const games = new Map<string, GameState>();

export function createEmptyPlayerState(playerId: string): PlayerState {
  return {
    playerId,
    hand: [],
    deck: [],
    active: null,
    bench: [null, null, null],
    koZone: [],
    ngulangPoints: 0,
    hasAttachedSKSThisTurn: false,
    hasRetreatedThisTurn: false,
  };
}

export function createGameState(roomId: string, hostId: string): GameState {
  const state: GameState = {
    roomId,
    players: {
      [hostId]: createEmptyPlayerState(hostId),
    },
    playerOrder: [hostId, ''],
    currentTurnPlayerId: hostId,
    phase: 'waiting',
    turnNumber: 0,
    battleLog: [],
    turnTimeLeft: TURN_TIME_LIMIT,
    turnStartTime: 0,
  };

  games.set(roomId, state);
  return state;
}

export function addPlayerToGameState(roomId: string, guestId: string): GameState | undefined {
  const state = games.get(roomId);
  if (!state) return undefined;

  state.players[guestId] = createEmptyPlayerState(guestId);
  state.playerOrder = [state.playerOrder[0], guestId];
  return state;
}

export function getGameState(roomId: string): GameState | undefined {
  return games.get(roomId);
}

export function setGameState(roomId: string, state: GameState): void {
  games.set(roomId, state);
}

export function updateGameState(
  roomId: string,
  updater: (state: GameState) => void
): GameState | undefined {
  const state = games.get(roomId);
  if (!state) return undefined;

  updater(state);
  return state;
}

export function deleteGameState(roomId: string): boolean {
  return games.delete(roomId);
}

export function hasGameState(roomId: string): boolean {
  return games.has(roomId);
}

export function getGameStateCount(): number {
  return games.size;
}

export { BENCH_SIZE };
