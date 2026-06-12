// ─────────────────────────────────────────────
// MASTER CARD DATABASE
// Element assignments from: goc tcg/character/ folder structure
// Rarity assignments from: goc rarity.md
// ─────────────────────────────────────────────

export interface CardData {
  id: string;
  name: string;
  element: 'Ambis' | 'Santuy' | 'Bucin';
  rarity: 'Common' | 'Rare' | 'Super Rare' | 'Ultra Rare' | 'Exclusive Legendary';
  rarityLabel: string; // IPK label
  hp: number;
  skill_name: string;
  skill_effect: string;
  weakness: string;
  lore: string;
  image_url: string;
}

// ─── AMBIS (Bagas, Nopal, Zaki) ───

const AMBIS_CARDS: CardData[] = [
  // Bagas — Ambis
  { id: 'bagas-maba', name: 'Sleepy Bagas', element: 'Ambis', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 90, skill_name: 'Tidur Dalam', skill_effect: 'Pulihkan 30 HP. Immune Burnout 1 giliran.', weakness: 'Santuy', lore: 'Jam 8 pagi masih di kos. Tapi IPK? 4.0.', image_url: '/images/character/bagas/maba/sleepy bagas.png' },
  { id: 'bagas-kating', name: 'Bagas Kating', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Catatan Rapi', skill_effect: 'Tambah 10 DEF.', weakness: 'Santuy', lore: 'Rajin mencatat tapi tidak pernah baca ulang.', image_url: '/images/character/bagas/kating/kartu basic.png' },
  { id: 'bagas-semsakhir', name: 'RRQ Sagab', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Pro Player Mode', skill_effect: 'Hype! +20 ATK, -10 HP/turn.', weakness: 'Santuy', lore: 'Skripsi belum bab 1, tapi rank Mythic Glory.', image_url: '/images/character/bagas/semsAkhir/rrq sagab.png' },

  // Nopal — Ambis
  { id: 'nopal-maba', name: 'Nopal Skinny', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Chat Tengah Malam', skill_effect: 'Turunkan ATK lawan 10.', weakness: 'Santuy', lore: 'Nilai IP 2.5 tapi chat doi dibalas dalam 0.3 detik.', image_url: '/images/character/nopal/maba/nopal skinny.png' },
  { id: 'nopal-kating', name: 'Nopal P Valo', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Coding Hati Baru', skill_effect: 'Target Hype! +20 ATK, -10 HP/turn.', weakness: 'Santuy', lore: 'Mantan jadi bahan skripsi. Sakit sekaligus produktif.', image_url: '/images/character/nopal/kating/nopal p valo.png' },
  { id: 'nopal-semsakhir', name: 'Nopal x Bitracom', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Sponsor Deal', skill_effect: 'Tambah 25 ATK. Ghosting lawan 1 giliran.', weakness: 'Santuy', lore: 'Dari anak kos jadi brand ambassador. Level up.', image_url: '/images/character/nopal/semsAkhir/nopal x bitracom.png' },

  // Zaki — Ambis
  { id: 'zaki-maba', name: 'Zaki', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Catatan Kilat', skill_effect: 'Tambah 10 DEF satu giliran.', weakness: 'Santuy', lore: 'Baru seminggu kuliah tapi udah bawa tas penuh buku.', image_url: '/images/character/zaki/maba/zaki.png' },
  { id: 'zaki-kating', name: 'Zaki FF', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 60, skill_name: 'Booyah!', skill_effect: 'ATK +15, critical 20% chance double.', weakness: 'Santuy', lore: 'Free Fire-nya pro, kuliahnya... nanti aja.', image_url: '/images/character/zaki/kating/zaki ff.png' },
  { id: 'zaki-noir', name: 'Zaki Noir', element: 'Ambis', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 95, skill_name: 'Dark Investigation', skill_effect: 'Lihat semua kartu lawan. Burnout 1 giliran.', weakness: 'Santuy', lore: 'Versi gelap dari Zaki. Misterius tapi pintar.', image_url: '/images/character/zaki/semsAkhir/zaki noir.png' },
  { id: 'zaki-cakahima', name: 'Zaki Cakahima', element: 'Ambis', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Ketua Himpunan', skill_effect: 'Burnout semua lawan 2 giliran. +30 ATK.', weakness: 'Santuy', lore: 'Dari maba sampai ketua. Legenda yang tak tergantikan.', image_url: '/images/character/zaki/semsAkhir/zaki cakahima.png' },
];

// ─── SANTUY (Baydar, Koten, Mikel) ───

const SANTUY_CARDS: CardData[] = [
  // Baydar — Santuy
  { id: 'baydar-maba', name: 'Baydar Maba', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Tidur Siang', skill_effect: 'Pulihkan 10 HP.', weakness: 'Bucin', lore: 'Masternya tidur di perpustakaan tanpa rasa bersalah.', image_url: '/images/character/baydar/maba/kartu basic.png' },
  { id: 'baydar-faker', name: 'Baydar Faker', element: 'Santuy', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 100, skill_name: 'Faker Mode', skill_effect: 'Ghosting lawan 2 giliran. +25 ATK.', weakness: 'Bucin', lore: 'Looks like a noob, plays like a god.', image_url: '/images/character/baydar/maba/baydar faker.png' },
  { id: 'baydar-kating', name: 'Baydar Kating', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Sabda Warkop', skill_effect: 'Mager lawan 2 giliran.', weakness: 'Bucin', lore: 'Senior yang paling ditakuti di warkop.', image_url: '/images/character/baydar/kating/baydar-kating.png' },
  { id: 'baydar-pemandu', name: 'Baydar Pemandu', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Pemandu Ospek', skill_effect: 'Mager semua lawan 1 giliran. +15 DEF.', weakness: 'Bucin', lore: 'Suaranya menggelegar di lapangan. Maba gemetar.', image_url: '/images/character/baydar/semsAkhir/baydar pemandu.png' },
  { id: 'baydar-semsakhir', name: 'Baydar Semester Akhir', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Sabda Dewa Warkop', skill_effect: 'Ghosting lawan 2 giliran. Immune Burnout.', weakness: 'Bucin', lore: 'Legenda warung kopi. Tidak ada tugas yang bertahan.', image_url: '/images/character/baydar/semsAkhir/baydar-semsakhir.png' },

  // Koten — Santuy
  { id: 'koten-maba', name: 'Koten', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Belajar Kelompok', skill_effect: 'Tambah 15 ATK.', weakness: 'Bucin', lore: 'Udah hapal silabus sebelum ospek dimulai.', image_url: '/images/character/koten/maba/koten.png' },
  { id: 'koten-amba', name: 'Amba Koten', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Ambasador Mode', skill_effect: 'Tambah 20 ATK dan 15 DEF.', weakness: 'Bucin', lore: 'Duta kampus yang selalu tampil rapi dan berwibawa.', image_url: '/images/character/koten/maba/amba koten.png' },
  { id: 'koten-kating', name: 'Koten Melet', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Melet Attack', skill_effect: 'ATK +10, lawan confusion 1 giliran.', weakness: 'Bucin', lore: 'Ekspresinya menyebalkan tapi efektif.', image_url: '/images/character/koten/kating/koten melet.png' },
  { id: 'koten-demon', name: 'Koten Demon King', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 130, skill_name: 'Final Boss Mode', skill_effect: 'Burnout semua lawan. +30 ATK. Immune 1 giliran.', weakness: 'Bucin', lore: 'IP 4.0. Tidak punya teman. Tidak butuh.', image_url: '/images/character/koten/semsAkhir/koten demon king.png' },

  // Mikel — Santuy
  { id: 'mikel-maba', name: 'Mikel', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Mager Total', skill_effect: 'Kunci lawan (Mager 1 giliran).', weakness: 'Bucin', lore: 'Filosofinya: kenapa berdiri kalau bisa rebahan.', image_url: '/images/character/mikel/maba/mikel.png' },
  { id: 'mikel-kating', name: 'Mikel Far From Home', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Jauh Dari Rumah', skill_effect: 'DEF +20, tapi Mager diri sendiri 1 giliran.', weakness: 'Bucin', lore: 'Anak rantau yang selalu kangen masakan ibu.', image_url: '/images/character/mikel/kating/mikel far from home.png' },
  { id: 'mikel-magneto', name: 'Mikel Magneto', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Magnetic Force', skill_effect: 'Tarik lawan ke arena. Ghosting 2 giliran.', weakness: 'Bucin', lore: 'Kekuatannya bukan magnetik, tapi malas yang menular.', image_url: '/images/character/mikel/semsAkhir/mikel magneto.png' },
];

// ─── BUCIN (Pebasket, Zaka) ───

const BUCIN_CARDS: CardData[] = [
  // Pebasket — Bucin
  { id: 'pebasket-maba', name: 'Pebasket', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Jump Shot', skill_effect: 'ATK +15, tapi miss 30% chance.', weakness: 'Ambis', lore: 'Di lapangan garang, di chat doi malu-malu.', image_url: '/images/character/pebasket/maba/pebasket.png' },
  { id: 'pebasket-kating', name: 'Pebasket Miss Her', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Miss Her', skill_effect: 'Sacrifice 10 HP → ATK +25.', weakness: 'Ambis', lore: 'Setiap three-pointer didedikasikan untuk mantannya.', image_url: '/images/character/pebasket/kating/pebasket miss her.png' },
  { id: 'pebasket-naga', name: 'Pebasket Naga', element: 'Bucin', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Dragon Dunk', skill_effect: 'ATK +30. Burnout lawan 1 giliran.', weakness: 'Ambis', lore: 'Evolusi terakhir. Dunk-nya menghancurkan segalanya.', image_url: '/images/character/pebasket/semsAkhir/pebasket naga.png' },
  { id: 'pebasket-tio', name: 'Pebasket Tio', element: 'Bucin', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Ultimate Slam', skill_effect: 'ATK +40. Ghosting lawan 2 giliran. Immune Burnout.', weakness: 'Ambis', lore: 'MVP sepanjang masa. Legenda lapangan basket kampus.', image_url: '/images/character/pebasket/semsAkhir/pebasket tio.png' },

  // Zaka — Bucin
  { id: 'zaka-maba', name: 'Verfil Zaka', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Profile Stalking', skill_effect: 'Lihat 1 kartu lawan.', weakness: 'Ambis', lore: 'Verified di semua sosmed. Followers? Doi doang.', image_url: '/images/character/zaka/maba/verfil.png' },
  { id: 'zaka-kating', name: 'Rusdi', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Sweet Talk', skill_effect: 'Turunkan DEF lawan 15.', weakness: 'Ambis', lore: 'Gombalannya receh tapi selalu berhasil.', image_url: '/images/character/zaka/kating/rusdi.png' },
  { id: 'zaka-semsakhir', name: 'Meteor Zaka', element: 'Bucin', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Meteor Strike', skill_effect: 'ATK +35. Burnout semua lawan 2 giliran.', weakness: 'Ambis', lore: 'Jatuh dari langit, menghancurkan hati semua orang.', image_url: '/images/character/zaka/semsAkhir/meteor.png' },
];

// ─── IRSWANDA (standalone — treat as Ambis per original placement) ───

const IRSWANDA_CARDS: CardData[] = [
  { id: 'irswanda-maba', name: 'Irswanda', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Duality', skill_effect: 'Tambah 10 ATK dan 10 DEF.', weakness: 'Santuy', lore: 'Dua kepribadian, satu tujuan: IPK 4.0.', image_url: '/images/character/irswanda/maba/duality.png' },
  { id: 'irswanda-kating', name: 'Lil Wanda', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 60, skill_name: 'Kuis Dadakan', skill_effect: 'Burnout lawan 2 giliran.', weakness: 'Santuy', lore: 'Tugasnya ada di silabus. Kamu yang tidak baca.', image_url: '/images/character/irswanda/kating/lil wanda.png' },
  { id: 'irswanda-semsakhir', name: 'Preman Exp', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 85, skill_name: 'Exp Grinding', skill_effect: 'ATK +20. Hype mode aktif.', weakness: 'Santuy', lore: 'Dari preman jadi the exp. Level up is real.', image_url: '/images/character/irswanda/semsAkhir/preman exp.png' },
];

// ─── COMBINED ───
export const ALL_CARDS: CardData[] = [
  ...AMBIS_CARDS,
  ...SANTUY_CARDS,
  ...BUCIN_CARDS,
  ...IRSWANDA_CARDS,
];

// ─── Rarity pools for gacha ───
// IPK 1 (Common) = base pool
// IPK 2.5 (Rare) = semsAkhir not in higher lists
// IPK 3.5 (Super Rare) = Baydar Pemandu, Amba Koten, Zaki Noir
// IPK 4 (Ultra Rare) = Baydar Faker, Sleepy Bagas
// IPK 4 EX (Exclusive Legendary) = Koten Demon King, Zaki Cakahima, Pebasket Tio, Meteor

export const RARITY_POOLS = {
  common:     ALL_CARDS.filter(c => c.rarity === 'Common'),
  rare:       ALL_CARDS.filter(c => c.rarity === 'Rare'),
  superRare:  ALL_CARDS.filter(c => c.rarity === 'Super Rare'),
  ultraRare:  ALL_CARDS.filter(c => c.rarity === 'Ultra Rare'),
  legendary:  ALL_CARDS.filter(c => c.rarity === 'Exclusive Legendary'),
};

// Gacha slot probabilities (5 slots per pack)
export const SLOT_CONFIG = [
  { common: 85, rare: 13, superRare: 1.8, ultraRare: 0.2, legendary: 0 },   // Slot 1
  { common: 85, rare: 13, superRare: 1.8, ultraRare: 0.2, legendary: 0 },   // Slot 2
  { common: 85, rare: 13, superRare: 1.8, ultraRare: 0.2, legendary: 0 },   // Slot 3
  { common: 80, rare: 16, superRare: 3.5, ultraRare: 0.5, legendary: 0 },   // Slot 4
  { common: 60, rare: 30, superRare: 8, ultraRare: 1.5, legendary: 0.5 },   // Slot 5
];

export function pickRarity(config: typeof SLOT_CONFIG[number]): CardData['rarity'] {
  const roll = Math.random() * 100; // Use precise float for accurate decimal percentages
  if (roll < config.common) return 'Common';
  if (roll < config.common + config.rare) return 'Rare';
  if (roll < config.common + config.rare + config.superRare) return 'Super Rare';
  if (roll < config.common + config.rare + config.superRare + config.ultraRare) return 'Ultra Rare';
  return 'Exclusive Legendary';
}

export function pickRandomCardFromPool(rarity: CardData['rarity']): CardData {
  const poolMap: Record<CardData['rarity'], CardData[]> = {
    'Common': RARITY_POOLS.common,
    'Rare': RARITY_POOLS.rare,
    'Super Rare': RARITY_POOLS.superRare,
    'Ultra Rare': RARITY_POOLS.ultraRare,
    'Exclusive Legendary': RARITY_POOLS.legendary,
  };
  const pool = poolMap[rarity];
  if (!pool || pool.length === 0) {
    // Fallback to common if pool is empty
    return RARITY_POOLS.common[Math.floor(Math.random() * RARITY_POOLS.common.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generatePull(): CardData[] {
  return SLOT_CONFIG.map((config) => {
    const rarity = pickRarity(config);
    const card = pickRandomCardFromPool(rarity);
    return { ...card, id: `${Date.now()}-${Math.random()}` };
  });
}

// ─── Rarity colors ───
export const RARITY_COLORS: Record<CardData['rarity'], string> = {
  'Common': '#ffffff',
  'Rare': '#1b5bff',
  'Super Rare': '#7333f1',
  'Ultra Rare': '#d7b73b',
  'Exclusive Legendary': '#fe2f2f',
};

export const ELEMENT_COLORS: Record<string, string> = {
  Ambis: '#fe2f2f',
  Santuy: '#d7b73b',
  Bucin: '#7333f1',
};
