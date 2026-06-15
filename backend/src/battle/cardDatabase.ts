import type { CardData } from './types';

/** Stats & names sourced from goc tcg card artwork */
export const BATTLE_CARDS: Record<string, CardData> = {
  'bagas-maba': {
    id: 'bagas-maba',
    name: 'Sleepy Bagas',
    stage: 0,
    element: 'Ambis',
    hp: 90,
    isEX: false,
    retreatCost: 1,
    weakness: 'Santuy',
    imageUrl: '/images/character/bagas/maba/sleepy bagas.webp',
    skills: [{ name: 'Turu dek', sksCost: 2, damage: 0 }],
  },
  'bagas-kating': {
    id: 'bagas-kating',
    name: 'Prof Bagas',
    stage: 1,
    element: 'Ambis',
    hp: 120,
    isEX: false,
    retreatCost: 2,
    weakness: 'Santuy',
    evolvesFrom: 'bagas-maba',
    imageUrl: '/images/character/bagas/kating/kartu basic.webp',
    skills: [{ name: 'Kuis Mendadak', sksCost: 2, damage: 50 }],
  },
  'nopal-maba': {
    id: 'nopal-maba',
    name: 'Nopal Skinny',
    stage: 0,
    element: 'Ambis',
    hp: 90,
    isEX: false,
    retreatCost: 1,
    weakness: 'Santuy',
    imageUrl: '/images/character/nopal/maba/nopal skinny.webp',
    skills: [{ name: 'Puyer Begadang', sksCost: 1, damage: 20 }],
  },
  'nopal-kating': {
    id: 'nopal-kating',
    name: 'Nopal P Valo',
    stage: 1,
    element: 'Ambis',
    hp: 120,
    isEX: false,
    retreatCost: 2,
    weakness: 'Santuy',
    evolvesFrom: 'nopal-maba',
    imageUrl: '/images/character/nopal/kating/nopal p valo.webp',
    skills: [{ name: 'Doping Nugas', sksCost: 2, damage: 30 }],
  },
  'zaki-maba': {
    id: 'zaki-maba',
    name: 'Zaki Frozen Food',
    stage: 0,
    element: 'Ambis',
    hp: 80,
    isEX: false,
    retreatCost: 1,
    weakness: 'Santuy',
    imageUrl: '/images/character/zaki/maba/zaki.webp',
    skills: [{ name: 'Modal Nugget', sksCost: 1, damage: 10 }],
  },
  'zaki-kating': {
    id: 'zaki-kating',
    name: 'Zaki Frozen Food',
    stage: 1,
    element: 'Ambis',
    hp: 110,
    isEX: false,
    retreatCost: 2,
    weakness: 'Santuy',
    evolvesFrom: 'zaki-maba',
    imageUrl: '/images/character/zaki/kating/zaki ff.webp',
    skills: [{ name: 'Bagian Kerja Sepihak', sksCost: 2, damage: 50 }],
  },
  'baydar-maba': {
    id: 'baydar-maba',
    name: 'Baydar',
    stage: 0,
    element: 'Santuy',
    hp: 90,
    isEX: false,
    retreatCost: 1,
    weakness: 'Bucin',
    imageUrl: '/images/character/baydar/maba/kartu basic.webp',
    skills: [{ name: 'Sapaan Warkop', sksCost: 1, damage: 20 }],
  },
  'baydar-kating': {
    id: 'baydar-kating',
    name: 'Baydar',
    stage: 1,
    element: 'Santuy',
    hp: 120,
    isEX: false,
    retreatCost: 2,
    weakness: 'Bucin',
    evolvesFrom: 'baydar-maba',
    imageUrl: '/images/character/baydar/kating/baydar-kating.webp',
    skills: [{ name: 'Ketenangan Ilahi', sksCost: 2, damage: 30 }],
  },
  'koten-maba': {
    id: 'koten-maba',
    name: 'Koten',
    stage: 0,
    element: 'Santuy',
    hp: 90,
    isEX: false,
    retreatCost: 1,
    weakness: 'Bucin',
    imageUrl: '/images/character/koten/maba/koten.webp',
    skills: [{ name: 'Tatapan Judes', sksCost: 1, damage: 20 }],
  },
  'koten-kating': {
    id: 'koten-kating',
    name: 'Koten',
    stage: 1,
    element: 'Santuy',
    hp: 110,
    isEX: false,
    retreatCost: 2,
    weakness: 'Bucin',
    evolvesFrom: 'koten-maba',
    imageUrl: '/images/character/koten/kating/koten melet.webp',
    skills: [{ name: 'Bisikan Titip Absen', sksCost: 2, damage: 40 }],
  },
  'pebasket-maba': {
    id: 'pebasket-maba',
    name: 'Pebasket',
    stage: 0,
    element: 'Bucin',
    hp: 80,
    isEX: false,
    retreatCost: 1,
    weakness: 'Ambis',
    imageUrl: '/images/character/pebasket/maba/pebasket.webp',
    skills: [{ name: 'Bagas Dribble', sksCost: 1, damage: 20 }],
  },
  'pebasket-kating': {
    id: 'pebasket-kating',
    name: 'Pebasket Miss Her',
    stage: 1,
    element: 'Bucin',
    hp: 80,
    isEX: false,
    retreatCost: 2,
    weakness: 'Ambis',
    evolvesFrom: 'pebasket-maba',
    imageUrl: '/images/character/pebasket/kating/pebasket miss her.webp',
    skills: [{ name: '90 Gombalan', sksCost: 2, damage: 40 }],
  },
  'zaka-maba': {
    id: 'zaka-maba',
    name: 'Monkey.D.Zek',
    stage: 0,
    element: 'Bucin',
    hp: 80,
    isEX: false,
    retreatCost: 1,
    weakness: 'Ambis',
    imageUrl: '/images/character/zaka/maba/verfil.webp',
    skills: [{ name: 'Pesona Inti Angkatan', sksCost: 1, damage: 20 }],
  },
};

const DECK_TEMPLATE: string[] = [
  'bagas-maba', 'bagas-maba', 'bagas-kating',
  'nopal-maba', 'nopal-maba', 'nopal-kating',
  'zaki-maba', 'zaki-maba', 'zaki-kating',
  'baydar-maba', 'baydar-maba', 'baydar-kating',
  'koten-maba', 'koten-maba', 'koten-kating',
  'pebasket-maba', 'pebasket-maba', 'pebasket-kating',
  'zaka-maba', 'zaka-maba',
];

function cloneCard(card: CardData): CardData {
  return {
    ...card,
    skills: card.skills.map((skill) => ({ ...skill })),
  };
}

export function getCardById(id: string): CardData | undefined {
  const card = BATTLE_CARDS[id];
  return card ? cloneCard(card) : undefined;
}

export function buildStandardDeck(): CardData[] {
  return DECK_TEMPLATE.map((id) => {
    const card = BATTLE_CARDS[id];
    if (!card) {
      throw new Error(`Battle card tidak ditemukan: ${id}`);
    }
    return cloneCard(card);
  });
}
