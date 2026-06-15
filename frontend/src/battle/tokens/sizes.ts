export const BATTLE_SIZES = {
  card: {
    active: { w: 120, h: 168 },
    bench: { w: 80, h: 112 },
    hand: { w: 92, h: 130 },
    opponentActive: { w: 100, h: 140 },
    opponentBench: { w: 68, h: 96 },
  },
  benchGap: 8,
} as const;

export type CardVariant =
  | 'active-player'
  | 'active-opponent'
  | 'bench-player'
  | 'bench-opponent'
  | 'hand';

export function getCardDimensions(variant: CardVariant) {
  switch (variant) {
    case 'active-player':
      return BATTLE_SIZES.card.active;
    case 'active-opponent':
      return BATTLE_SIZES.card.opponentActive;
    case 'bench-player':
      return BATTLE_SIZES.card.bench;
    case 'bench-opponent':
      return BATTLE_SIZES.card.opponentBench;
    case 'hand':
      return BATTLE_SIZES.card.hand;
  }
}
