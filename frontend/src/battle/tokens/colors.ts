export const BATTLE_COLORS = {
  bg: {
    base: '#0D0D14',
    arena: '#12121F',
    opponent: '#0A0A18',
    player: '#111120',
    card: '#1C1C2E',
    overlay: 'rgba(0,0,0,0.75)',
  },
  glow: {
    active: '#7C3AED',
    ex: '#C5A028',
    attack: '#DC2626',
    selected: '#7C3AED33',
  },
  element: {
    Ambis: '#3B82F6',
    Santuy: '#22C55E',
    Bucin: '#EC4899',
  },
  hp: {
    high: '#22C55E',
    mid: '#EAB308',
    low: '#EF4444',
    track: '#2A2A3E',
  },
  sks: {
    filled: '#C5A028',
    empty: '#2A2A3E',
    button: '#C5A02833',
  },
  point: {
    filled: '#DC2626',
    empty: '#2A2A3E',
    bg: '#1A0A0A',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B8',
    muted: '#505068',
    damage: '#FFFFFF',
    heal: '#22C55E',
    label: '#C5A028',
  },
  ui: {
    border: '#2A2A42',
    separator: '#1E1E30',
    buttonBg: '#1C1C2E',
    buttonHover: '#252538',
    danger: '#DC2626',
    success: '#22C55E',
  },
} as const;

export const STAGE_LABELS: Record<0 | 1 | 2, string> = {
  0: 'MABA',
  1: 'KATING',
  2: 'SEMS AKHIR',
};

export const STAGE_COLORS: Record<0 | 1 | 2, string> = {
  0: '#3B82F6',
  1: '#A855F7',
  2: '#C5A028',
};

export const ELEMENT_ICONS: Record<string, string> = {
  Ambis: '📚',
  Santuy: '😎',
  Bucin: '💘',
};

export function getHpColor(current: number, max: number): string {
  const pct = max > 0 ? current / max : 0;
  if (pct > 0.5) return BATTLE_COLORS.hp.high;
  if (pct > 0.25) return BATTLE_COLORS.hp.mid;
  return BATTLE_COLORS.hp.low;
}
