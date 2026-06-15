export type Element = 'Ambis' | 'Santuy' | 'Bucin';

export type GamePhase = 'waiting' | 'setup' | 'battle' | 'ended';

export type CardData = {
  id: string;
  name: string;
  stage: 0 | 1 | 2;
  element: Element;
  hp: number;
  isEX: boolean;
  retreatCost: number;
  weakness: Element;
  skills: {
    name: string;
    sksCost: number;
    damage: number;
  }[];
  evolvesFrom?: string;
  imageUrl?: string;
};

export type ActiveCard = {
  instanceId: string;
  cardData: CardData;
  currentHP: number;
  attachedSKS: number;
  evolvedThisTurn: boolean;
};

export type PlayerState = {
  playerId: string;
  hand: CardData[];
  deck: CardData[];
  active: ActiveCard | null;
  bench: (ActiveCard | null)[];
  koZone: CardData[];
  ngulangPoints: number;
  hasAttachedSKSThisTurn: boolean;
  hasRetreatedThisTurn: boolean;
};

export type BattleAction =
  | { type: 'draw_card'; playerId: string; cardName: string; timestamp: number }
  | { type: 'play_card'; playerId: string; cardName: string; target: 'bench' | 'active'; timestamp: number }
  | { type: 'evolve_card'; playerId: string; fromCard: string; toCard: string; timestamp: number }
  | { type: 'attach_sks'; playerId: string; target: string; timestamp: number }
  | { type: 'attack'; playerId: string; skillName: string; damage: number; isWeakness: boolean; timestamp: number }
  | { type: 'ko'; playerId: string; cardName: string; points: number; timestamp: number }
  | { type: 'retreat'; playerId: string; fromCard: string; toCard: string; timestamp: number }
  | { type: 'end_turn'; playerId: string; timestamp: number }
  | { type: 'game_over'; winnerId: string; reason: string; timestamp: number };

export type GameState = {
  roomId: string;
  players: Record<string, PlayerState>;
  playerOrder: [string, string];
  currentTurnPlayerId: string;
  phase: GamePhase;
  turnNumber: number;
  winnerId?: string;
  battleLog: BattleAction[];
  turnTimeLeft: number;
  turnStartTime: number;
};

export type AttackResult = {
  damage: number;
  isWeakness: boolean;
  defenderHP: number;
  koOccurred: boolean;
  pointsAwarded: number;
  ngulangPoints: Record<string, number>;
};

export type BenchTarget = 'active' | 0 | 1 | 2;

export type BattleView =
  | 'disconnected'
  | 'lobby'
  | 'waiting'
  | 'setup'
  | 'battle'
  | 'ended';
