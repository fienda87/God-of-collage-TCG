// ─────────────────────────────────────────────
// MASTER CARD DATABASE
// Element assignments from: goc tcg/character/ folder structure
// Rarity assignments from: goc rarity.md
// ─────────────────────────────────────────────

export interface BattleSkill {
  name: string;
  cost: number;       // SKS energy cost to use
  damage: number;     // base damage dealt
  effect?: string;    // special effect key: 'burnout' | 'hype' | 'ghosting' | 'mager' | 'heal' | 'atk_buff' | 'def_buff'
}

export interface CardData {
  id: string;
  name: string;
  element: 'Ambis' | 'Santuy' | 'Bucin' | 'Event' | 'Item';
  rarity: 'Common' | 'Rare' | 'Super Rare' | 'Ultra Rare' | 'Exclusive Legendary' | 'Special Mythical';
  rarityLabel: string; // IPK label
  hp: number;
  skill_name: string;
  skill_effect: string;
  weakness: string;
  lore: string;
  image_url: string;
  imageUrl?: string;
  volume?: number;
  // ── Battle fields ──
  stage?: 0 | 1 | 2;
  skills?: BattleSkill[];
  retreatCost?: number;
  evolvesFrom?: string;
  isEX?: boolean;
}

// ─── AMBIS (Bagas, Nopal, Zaki) ───

const AMBIS_CARDS: CardData[] = [
  // Bagas — Ambis
  { id: 'bagas-maba', name: 'Sleepy Bagas', element: 'Ambis', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 90, skill_name: 'Tidur Dalam', skill_effect: 'Pulihkan 30 HP. Immune Burnout 1 giliran.', weakness: 'Santuy', lore: 'Jam 8 pagi masih di kos. Tapi IPK? 4.0.', image_url: '/images/character/bagas/maba/sleepy bagas.webp', volume: 1, stage: 0, skills: [{ name: 'Tidur Dalam', cost: 1, damage: 10, effect: 'heal' }, { name: 'Alarm Mati', cost: 1, damage: 15 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'bagas-kating', name: 'Bagas Kating', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Catatan Rapi', skill_effect: 'Tambah 10 DEF.', weakness: 'Santuy', lore: 'Rajin mencatat tapi tidak pernah baca ulang.', image_url: '/images/character/bagas/kating/kartu basic.webp', volume: 1, stage: 1, skills: [{ name: 'Catatan Rapi', cost: 1, damage: 20, effect: 'def_buff' }, { name: 'Kuis Dadakan', cost: 2, damage: 30 }], retreatCost: 1, evolvesFrom: 'bagas-maba', isEX: false },
  { id: 'bagas-semsakhir', name: 'RRQ Sagab', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Pro Player Mode', skill_effect: 'Hype! +20 ATK, -10 HP/turn.', weakness: 'Santuy', lore: 'Skripsi belum bab 1, tapi rank Mythic Glory.', image_url: '/images/character/bagas/semsAkhir/rrq sagab.webp', volume: 1, stage: 2, skills: [{ name: 'Hype Mode', cost: 2, damage: 35, effect: 'hype' }, { name: 'Mythic Glory', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'bagas-kating', isEX: false },

  // Nopal — Ambis
  { id: 'nopal-maba', name: 'Nopal Skinny', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Chat Tengah Malam', skill_effect: 'Turunkan ATK lawan 10.', weakness: 'Santuy', lore: 'Nilai IP 2.5 tapi chat doi dibalas dalam 0.3 detik.', image_url: '/images/character/nopal/maba/nopal skinny.webp', volume: 1, stage: 0, skills: [{ name: 'Chat Malam', cost: 1, damage: 10, effect: 'atk_buff' }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'nopal-kating', name: 'Nopal P Valo', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Coding Hati Baru', skill_effect: 'Target Hype! +20 ATK, -10 HP/turn.', weakness: 'Santuy', lore: 'Mantan jadi bahan skripsi. Sakit sekaligus produktif.', image_url: '/images/character/nopal/kating/nopal p valo.webp', volume: 1, stage: 1, skills: [{ name: 'Hype Coding', cost: 1, damage: 25, effect: 'hype' }, { name: 'Debug Force', cost: 2, damage: 35 }], retreatCost: 1, evolvesFrom: 'nopal-maba', isEX: false },
  { id: 'nopal-semsakhir', name: 'Nopal x Bitracom', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Sponsor Deal', skill_effect: 'Tambah 25 ATK. Ghosting lawan 1 giliran.', weakness: 'Santuy', lore: 'Dari anak kos jadi brand ambassador. Level up.', image_url: '/images/character/nopal/semsAkhir/nopal x bitracom.webp', volume: 1, stage: 2, skills: [{ name: 'Sponsor Deal', cost: 2, damage: 30, effect: 'ghosting' }, { name: 'Brand Launch', cost: 3, damage: 45 }], retreatCost: 2, evolvesFrom: 'nopal-kating', isEX: false },

  // Zaki — Ambis
  { id: 'zaki-maba', name: 'Zaki', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Catatan Kilat', skill_effect: 'Tambah 10 DEF satu giliran.', weakness: 'Santuy', lore: 'Baru seminggu kuliah tapi udah bawa tas penuh buku.', image_url: '/images/character/zaki/maba/zaki.webp', volume: 1, stage: 0, skills: [{ name: 'Catatan Kilat', cost: 1, damage: 15, effect: 'def_buff' }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'zaki-kating', name: 'Zaki FF', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 60, skill_name: 'Booyah!', skill_effect: 'ATK +15, critical 20% chance double.', weakness: 'Santuy', lore: 'Free Fire-nya pro, kuliahnya... nanti aja.', image_url: '/images/character/zaki/kating/zaki ff.webp', volume: 1, stage: 1, skills: [{ name: 'Booyah!', cost: 1, damage: 20 }, { name: 'Headshot!', cost: 2, damage: 35 }], retreatCost: 1, evolvesFrom: 'zaki-maba', isEX: false },
  { id: 'zaki-noir', name: 'Zaki Noir', element: 'Ambis', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 95, skill_name: 'Dark Investigation', skill_effect: 'Lihat semua kartu lawan. Burnout 1 giliran.', weakness: 'Santuy', lore: 'Versi gelap dari Zaki. Misterius tapi pintar.', image_url: '/images/character/zaki/semsAkhir/zaki noir.webp', volume: 1, stage: 2, skills: [{ name: 'Dark Investigate', cost: 2, damage: 30, effect: 'burnout' }, { name: 'Shadow Strike', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'zaki-kating', isEX: false },
  { id: 'zaki-cakahima', name: 'Zaki Cakahima', element: 'Ambis', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Ketua Himpunan', skill_effect: 'Burnout semua lawan 2 giliran. +30 ATK.', weakness: 'Santuy', lore: 'Dari maba sampai ketua. Legenda yang tak tergantikan.', image_url: '/images/character/zaki/semsAkhir/zaki cakahima.webp', volume: 1, stage: 2, skills: [{ name: 'Ketua Himpunan', cost: 3, damage: 40, effect: 'burnout' }, { name: 'Final Address', cost: 4, damage: 60 }], retreatCost: 3, evolvesFrom: 'zaki-noir', isEX: true },
  // Zaki - Vol 2
  { id: 'zaki-ocean', name: 'Zaki Ocean', element: 'Ambis', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 100, skill_name: 'Zaki Ocean', skill_effect: 'Flood attack.', weakness: 'Santuy', lore: 'Lautan pengetahuan tanpa batas.', image_url: '/images/vol2/zaki ocean.webp', volume: 2, stage: 2, skills: [{ name: 'Tsunami', cost: 2, damage: 35 }, { name: 'Deep Blue', cost: 3, damage: 55 }], retreatCost: 2, evolvesFrom: 'zaki-kating', isEX: false },

];

// ─── SANTUY (Baydar, Koten, Mikel) ───

const SANTUY_CARDS: CardData[] = [
  // Baydar — Santuy
  { id: 'baydar-maba', name: 'Baydar Maba', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Tidur Siang', skill_effect: 'Pulihkan 10 HP.', weakness: 'Bucin', lore: 'Masternya tidur di perpustakaan tanpa rasa bersalah.', image_url: '/images/character/baydar/maba/kartu basic.webp', volume: 1, stage: 0, skills: [{ name: 'Tidur Siang', cost: 1, damage: 10, effect: 'heal' }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'baydar-faker', name: 'Baydar Faker', element: 'Santuy', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 100, skill_name: 'Faker Mode', skill_effect: 'Ghosting lawan 2 giliran. +25 ATK.', weakness: 'Bucin', lore: 'Looks like a noob, plays like a god.', image_url: '/images/character/baydar/maba/baydar faker.webp', volume: 1, stage: 0, skills: [{ name: 'Faker Mode', cost: 2, damage: 25, effect: 'ghosting' }, { name: 'Outplay', cost: 3, damage: 40 }], retreatCost: 2, evolvesFrom: undefined, isEX: false },
  { id: 'baydar-kating', name: 'Baydar Kating', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Sabda Warkop', skill_effect: 'Mager lawan 2 giliran.', weakness: 'Bucin', lore: 'Senior yang paling ditakuti di warkop.', image_url: '/images/character/baydar/kating/baydar-kating.webp', volume: 1, stage: 1, skills: [{ name: 'Sabda Warkop', cost: 1, damage: 20, effect: 'mager' }, { name: 'Kopi Hitam', cost: 2, damage: 30 }], retreatCost: 1, evolvesFrom: 'baydar-maba', isEX: false },
  { id: 'baydar-pemandu', name: 'Baydar Pemandu', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Pemandu Ospek', skill_effect: 'Mager semua lawan 1 giliran. +15 DEF.', weakness: 'Bucin', lore: 'Suaranya menggelegar di lapangan. Maba gemetar.', image_url: '/images/character/baydar/semsAkhir/baydar pemandu.webp', volume: 1, stage: 2, skills: [{ name: 'Pemandu Ospek', cost: 2, damage: 30, effect: 'mager' }, { name: 'Senam Pagi', cost: 3, damage: 45, effect: 'def_buff' }], retreatCost: 2, evolvesFrom: 'baydar-kating', isEX: false },
  { id: 'baydar-semsakhir', name: 'Baydar Semester Akhir', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Sabda Dewa Warkop', skill_effect: 'Ghosting lawan 2 giliran. Immune Burnout.', weakness: 'Bucin', lore: 'Legenda warung kopi. Tidak ada tugas yang bertahan.', image_url: '/images/character/baydar/semsAkhir/baydar-semsakhir.webp', volume: 1, stage: 2, skills: [{ name: 'Sabda Dewa', cost: 2, damage: 35, effect: 'ghosting' }, { name: 'Kopi Terakhir', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'baydar-kating', isEX: false },

  // Koten — Santuy
  { id: 'koten-maba', name: 'Koten', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Belajar Kelompok', skill_effect: 'Tambah 15 ATK.', weakness: 'Bucin', lore: 'Udah hapal silabus sebelum ospek dimulai.', image_url: '/images/character/koten/maba/koten.webp', volume: 1, stage: 0, skills: [{ name: 'Belajar Kelompok', cost: 1, damage: 15, effect: 'atk_buff' }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'koten-amba', name: 'Amba Koten', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Ambasador Mode', skill_effect: 'Tambah 20 ATK dan 15 DEF.', weakness: 'Bucin', lore: 'Duta kampus yang selalu tampil rapi dan berwibawa.', image_url: '/images/character/koten/maba/amba koten.webp', volume: 1, stage: 0, skills: [{ name: 'Ambasador Mode', cost: 2, damage: 25, effect: 'atk_buff' }, { name: 'Public Speech', cost: 3, damage: 40 }], retreatCost: 2, evolvesFrom: undefined, isEX: false },
  { id: 'koten-kating', name: 'Koten Melet', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Melet Attack', skill_effect: 'ATK +10, lawan confusion 1 giliran.', weakness: 'Bucin', lore: 'Ekspresinya menyebalkan tapi efektif.', image_url: '/images/character/koten/kating/koten melet.webp', volume: 1, stage: 1, skills: [{ name: 'Melet Attack', cost: 1, damage: 20 }, { name: 'Jilat Bibir', cost: 2, damage: 35 }], retreatCost: 1, evolvesFrom: 'koten-maba', isEX: false },
  { id: 'koten-demon', name: 'Koten Demon King', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 130, skill_name: 'Final Boss Mode', skill_effect: 'Burnout semua lawan. +30 ATK. Immune 1 giliran.', weakness: 'Bucin', lore: 'IP 4.0. Tidak punya teman. Tidak butuh.', image_url: '/images/character/koten/semsAkhir/koten demon king.webp', volume: 1, stage: 2, skills: [{ name: 'Final Boss', cost: 3, damage: 45, effect: 'burnout' }, { name: 'Demon Rage', cost: 4, damage: 65 }], retreatCost: 3, evolvesFrom: 'koten-kating', isEX: true },

  // Mikel — Santuy
  { id: 'mikel-maba', name: 'Mikel', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Mager Total', skill_effect: 'Kunci lawan (Mager 1 giliran).', weakness: 'Bucin', lore: 'Filosofinya: kenapa berdiri kalau bisa rebahan.', image_url: '/images/character/mikel/maba/mikel.webp', volume: 1, stage: 0, skills: [{ name: 'Mager Total', cost: 1, damage: 10, effect: 'mager' }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'mikel-kating', name: 'Mikel Far From Home', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Jauh Dari Rumah', skill_effect: 'DEF +20, tapi Mager diri sendiri 1 giliran.', weakness: 'Bucin', lore: 'Anak rantau yang selalu kangen masakan ibu.', image_url: '/images/character/mikel/kating/mikel far from home.webp', volume: 1, stage: 1, skills: [{ name: 'Kangen Ibu', cost: 1, damage: 20, effect: 'def_buff' }, { name: 'Video Call', cost: 2, damage: 30 }], retreatCost: 1, evolvesFrom: 'mikel-maba', isEX: false },
  { id: 'mikel-magneto', name: 'Mikel Magneto', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Magnetic Force', skill_effect: 'Tarik lawan ke arena. Ghosting 2 giliran.', weakness: 'Bucin', lore: 'Kekuatannya bukan magnetik, tapi malas yang menular.', image_url: '/images/character/mikel/semsAkhir/mikel magneto.webp', volume: 1, stage: 2, skills: [{ name: 'Magnetic Force', cost: 2, damage: 35, effect: 'ghosting' }, { name: 'Gravity Pull', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'mikel-kating', isEX: false },
  // Agip - Vol 2
  { id: 'agip-maba', name: 'Agip', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Agip', skill_effect: 'Chill attack.', weakness: 'Bucin', lore: 'Tenang saja.', image_url: '/images/vol2/agip.webp', volume: 2, stage: 0, skills: [{ name: 'Chill', cost: 1, damage: 10 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'agip-asistensi', name: 'Agip Asistensi', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Agip Asistensi', skill_effect: 'DEF buff.', weakness: 'Bucin', lore: 'Asisten ramah.', image_url: '/images/vol2/agip asistensi.webp', volume: 2, stage: 1, skills: [{ name: 'Asisten', cost: 1, damage: 20, effect: 'def_buff' }], retreatCost: 1, evolvesFrom: 'agip-maba', isEX: false },
  { id: 'agip-prof', name: 'Prof Agip', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Prof Agip', skill_effect: 'Power lecture.', weakness: 'Bucin', lore: 'Dosen legendaris.', image_url: '/images/vol2/prof agip.webp', volume: 2, stage: 2, skills: [{ name: 'Kuliah Tamat', cost: 2, damage: 35 }, { name: 'Sidang', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'agip-asistensi', isEX: false },
  { id: 'agip-demon', name: 'Demon King Sangata', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 125, skill_name: 'Demon King Sangata', skill_effect: 'Ultimate power.', weakness: 'Bucin', lore: 'Raja sangata.', image_url: '/images/vol2/demon king sangata.webp', volume: 2, stage: 2, skills: [{ name: 'Demon Wave', cost: 3, damage: 45, effect: 'burnout' }, { name: 'Sangata Fury', cost: 4, damage: 60 }], retreatCost: 3, evolvesFrom: 'agip-prof', isEX: true },

  // Baydar - Vol 2
  { id: 'baydar-pestapora', name: 'Baydar Pestapora', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 75, skill_name: 'Baydar Pestapora', skill_effect: 'Festival attack.', weakness: 'Bucin', lore: 'Pestapora vibes.', image_url: '/images/vol2/baydar pestapora.webp', volume: 2, stage: 1, skills: [{ name: 'Festival', cost: 1, damage: 25 }, { name: 'Stage Act', cost: 2, damage: 35 }], retreatCost: 1, evolvesFrom: 'baydar-maba', isEX: false },
  { id: 'baydar-asasin', name: 'Asasin Baydar', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Asasin Baydar', skill_effect: 'Stealth kill.', weakness: 'Bucin', lore: 'Senyuman terakhir.', image_url: '/images/vol2/asasin baydar.webp', volume: 2, stage: 2, skills: [{ name: 'Silent Kill', cost: 3, damage: 45 }, { name: 'Asasin Strike', cost: 4, damage: 60 }], retreatCost: 3, evolvesFrom: 'baydar-kating', isEX: true },
  { id: 'baydar-sarjana', name: 'Sarjana 3 Pikiran', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 85, skill_name: 'Sarjana 3 Pikiran', skill_effect: 'Multi buff.', weakness: 'Bucin', lore: 'Lulus dengan 3 pikiran.', image_url: '/images/vol2/sarjana 3 pikiran.webp', volume: 2, stage: 2, skills: [{ name: 'Pikiran 1', cost: 2, damage: 30, effect: 'atk_buff' }, { name: 'Pikiran 3', cost: 3, damage: 45 }], retreatCost: 2, evolvesFrom: 'baydar-kating', isEX: false },

  // Koten - Vol 2
  { id: 'koten-kesurupan', name: 'Koten Kesurupan', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Koten Kesurupan', skill_effect: 'Confusion.', weakness: 'Bucin', lore: 'Kesurupan mode.', image_url: '/images/vol2/koten kesurupan.webp', volume: 2, stage: 0, skills: [{ name: 'Kesurupan', cost: 1, damage: 10, effect: 'mager' }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'koten-sybau', name: 'Koten Sybau', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Koten Sybau', skill_effect: 'Power move.', weakness: 'Bucin', lore: 'Sybau energy.', image_url: '/images/vol2/koten sybau.webp', volume: 2, stage: 2, skills: [{ name: 'Sybau Strike', cost: 2, damage: 35 }, { name: 'Final Sybau', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'koten-kating', isEX: false },
  { id: 'koten-poseidon', name: 'Koten Poseidon', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 130, skill_name: 'Koten Poseidon', skill_effect: 'Ocean fury.', weakness: 'Bucin', lore: 'God of the sea.', image_url: '/images/vol2/koten poseidon.webp', volume: 2, stage: 2, skills: [{ name: 'Trident', cost: 3, damage: 45, effect: 'burnout' }, { name: 'Poseidon Wrath', cost: 4, damage: 65 }], retreatCost: 3, evolvesFrom: 'koten-kating', isEX: true },

  // Mikel - Vol 2
  { id: 'mikel-intel', name: 'Mikel Intel', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Mikel Intel', skill_effect: 'Quick attack.', weakness: 'Bucin', lore: 'Fast processor.', image_url: '/images/vol2/mikel intel.webp', volume: 2, stage: 0, skills: [{ name: 'Quick Boot', cost: 1, damage: 10 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'mikel-okegas', name: 'Mikel Okegas', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 75, skill_name: 'Mikel Okegas', skill_effect: 'Gas attack.', weakness: 'Bucin', lore: 'Oke gas!', image_url: '/images/vol2/mikel okegas.webp', volume: 2, stage: 1, skills: [{ name: 'Gas Strike', cost: 1, damage: 25 }, { name: 'Full Tank', cost: 2, damage: 35 }], retreatCost: 1, evolvesFrom: 'mikel-maba', isEX: false },

];

// ─── BUCIN (Pebasket, Zaka) ───

const BUCIN_CARDS: CardData[] = [
  // Pebasket — Bucin
  { id: 'pebasket-maba', name: 'Pebasket', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Jump Shot', skill_effect: 'ATK +15, tapi miss 30% chance.', weakness: 'Ambis', lore: 'Di lapangan garang, di chat doi malu-malu.', image_url: '/images/character/pebasket/maba/pebasket.webp', volume: 1, stage: 0, skills: [{ name: 'Jump Shot', cost: 1, damage: 15 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'pebasket-kating', name: 'Pebasket Miss Her', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Miss Her', skill_effect: 'Sacrifice 10 HP → ATK +25.', weakness: 'Ambis', lore: 'Setiap three-pointer didedikasikan untuk mantannya.', image_url: '/images/character/pebasket/kating/pebasket miss her.webp', volume: 1, stage: 1, skills: [{ name: 'Miss Her', cost: 1, damage: 25 }, { name: 'Free Throw', cost: 2, damage: 35 }], retreatCost: 1, evolvesFrom: 'pebasket-maba', isEX: false },
  { id: 'pebasket-naga', name: 'Pebasket Naga', element: 'Bucin', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Dragon Dunk', skill_effect: 'ATK +30. Burnout lawan 1 giliran.', weakness: 'Ambis', lore: 'Evolusi terakhir. Dunk-nya menghancurkan segalanya.', image_url: '/images/character/pebasket/semsAkhir/pebasket naga.webp', volume: 1, stage: 2, skills: [{ name: 'Dragon Dunk', cost: 2, damage: 40, effect: 'burnout' }, { name: 'Alley Oop', cost: 3, damage: 55 }], retreatCost: 2, evolvesFrom: 'pebasket-kating', isEX: false },
  { id: 'pebasket-tio', name: 'Pebasket Tio', element: 'Bucin', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Ultimate Slam', skill_effect: 'ATK +40. Ghosting lawan 2 giliran. Immune Burnout.', weakness: 'Ambis', lore: 'MVP sepanjang masa. Legenda lapangan basket kampus.', image_url: '/images/character/pebasket/semsAkhir/pebasket tio.webp', volume: 1, stage: 2, skills: [{ name: 'Ultimate Slam', cost: 3, damage: 45, effect: 'ghosting' }, { name: 'MVP Legacy', cost: 4, damage: 60 }], retreatCost: 3, evolvesFrom: 'pebasket-kating', isEX: true },

  // Zaka — Bucin
  { id: 'zaka-maba', name: 'Verfil Zaka', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Profile Stalking', skill_effect: 'Lihat 1 kartu lawan.', weakness: 'Ambis', lore: 'Verified di semua sosmed. Followers? Doi doang.', image_url: '/images/character/zaka/maba/verfil.webp', volume: 1, stage: 0, skills: [{ name: 'Stalk', cost: 1, damage: 10 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'zaka-kating', name: 'Rusdi', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Sweet Talk', skill_effect: 'Turunkan DEF lawan 15.', weakness: 'Ambis', lore: 'Gombalannya receh tapi selalu berhasil.', image_url: '/images/character/zaka/kating/rusdi.webp', volume: 1, stage: 1, skills: [{ name: 'Sweet Talk', cost: 1, damage: 20, effect: 'def_buff' }, { name: 'Love Bomb', cost: 2, damage: 30 }], retreatCost: 1, evolvesFrom: 'zaka-maba', isEX: false },
  { id: 'zaka-semsakhir', name: 'Meteor Zaka', element: 'Bucin', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Meteor Strike', skill_effect: 'ATK +35. Burnout semua lawan 2 giliran.', weakness: 'Ambis', lore: 'Jatuh dari langit, menghancurkan hati semua orang.', image_url: '/images/character/zaka/semsAkhir/meteor.webp', volume: 1, stage: 2, skills: [{ name: 'Meteor Strike', cost: 3, damage: 45, effect: 'burnout' }, { name: 'Meteor Rain', cost: 4, damage: 65 }], retreatCost: 3, evolvesFrom: 'zaka-kating', isEX: true },
  // Aqil - Vol 2
  { id: 'aqil-maba', name: 'Aqil', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Aqil', skill_effect: 'Quick hit.', weakness: 'Ambis', lore: 'Silent type.', image_url: '/images/vol2/aqil.webp', volume: 2, stage: 0, skills: [{ name: 'Quick Hit', cost: 1, damage: 10 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'aqil-parttimer', name: 'Aqil Part Timer', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Aqil Part Timer', skill_effect: 'Part timer strike.', weakness: 'Ambis', lore: 'Kerja sambil nge-crush.', image_url: '/images/vol2/aqil part timer.webp', volume: 2, stage: 1, skills: [{ name: 'Shift Done', cost: 1, damage: 20 }, { name: 'Overtime', cost: 2, damage: 30 }], retreatCost: 1, evolvesFrom: 'aqil-maba', isEX: false },
  { id: 'aqil-agent', name: 'Agent Qil', element: 'Bucin', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Agent Qil', skill_effect: 'Spy attack.', weakness: 'Ambis', lore: 'Secret agent of love.', image_url: '/images/vol2/agent qil.webp', volume: 2, stage: 2, skills: [{ name: 'Agent Strike', cost: 2, damage: 35 }, { name: 'Mission Complete', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'aqil-parttimer', isEX: false },

  // Pebasket - Vol 2
  { id: 'pebasket-cina', name: 'Pebasket Cina', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Pebasket Cina', skill_effect: 'Quick shot.', weakness: 'Ambis', lore: 'Fast shooter.', image_url: '/images/vol2/pebasket cina.webp', volume: 2, stage: 0, skills: [{ name: 'Quick Shot', cost: 1, damage: 10 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'pebasket-tioclaude', name: 'Tio Claude', element: 'Bucin', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 100, skill_name: 'Tio Claude', skill_effect: 'Premium dunk.', weakness: 'Ambis', lore: 'Claude edition.', image_url: '/images/vol2/tio claude.webp', volume: 2, stage: 2, skills: [{ name: 'Claude Dunk', cost: 2, damage: 35 }, { name: 'Tio Legacy', cost: 3, damage: 55 }], retreatCost: 2, evolvesFrom: 'pebasket-kating', isEX: false },

  // Zaka - Vol 2
  { id: 'zaka-epstein', name: 'Zaka Epstein', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Zaka Epstein', skill_effect: 'Love note.', weakness: 'Ambis', lore: 'Epstein didnt kill himself.', image_url: '/images/vol2/zaka epstein.webp', volume: 2, stage: 0, skills: [{ name: 'Love Note', cost: 1, damage: 10 }], retreatCost: 1, evolvesFrom: undefined, isEX: false },

];

// ─── IRSWANDA (standalone — treat as Ambis per original placement) ───

const IRSWANDA_CARDS: CardData[] = [
  { id: 'irswanda-maba', name: 'Irswanda', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Duality', skill_effect: 'Tambah 10 ATK dan 10 DEF.', weakness: 'Santuy', lore: 'Dua kepribadian, satu tujuan: IPK 4.0.', image_url: '/images/character/irswanda/maba/duality.webp', volume: 1, stage: 0, skills: [{ name: 'Duality', cost: 1, damage: 15, effect: 'atk_buff' }], retreatCost: 1, evolvesFrom: undefined, isEX: false },
  { id: 'irswanda-kating', name: 'Lil Wanda', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 60, skill_name: 'Kuis Dadakan', skill_effect: 'Burnout lawan 2 giliran.', weakness: 'Santuy', lore: 'Tugasnya ada di silabus. Kamu yang tidak baca.', image_url: '/images/character/irswanda/kating/lil wanda.webp', volume: 1, stage: 1, skills: [{ name: 'Kuis Dadakan', cost: 1, damage: 20, effect: 'burnout' }, { name: 'Pop Quiz', cost: 2, damage: 30 }], retreatCost: 1, evolvesFrom: 'irswanda-maba', isEX: false },
  { id: 'irswanda-semsakhir', name: 'Preman Exp', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 85, skill_name: 'Exp Grinding', skill_effect: 'ATK +20. Hype mode aktif.', weakness: 'Santuy', lore: 'Dari preman jadi the exp. Level up is real.', image_url: '/images/character/irswanda/semsAkhir/preman exp.webp', volume: 1, stage: 2, skills: [{ name: 'Exp Grinding', cost: 2, damage: 35, effect: 'hype' }, { name: 'Max Level', cost: 3, damage: 50 }], retreatCost: 2, evolvesFrom: 'irswanda-kating', isEX: false },
];

// ─── EVENTS ───
const EVENT_CARDS: CardData[] = [
  { id: 'event-makrab', name: 'Makrab', element: 'Event', rarity: 'Common', rarityLabel: 'Event', hp: 0, skill_name: 'Bonding', skill_effect: 'Menambah sinergi seluruh kartu sebesar 10%.', weakness: 'Lelah', lore: 'Malam keakraban, di mana semua orang jadi sok kenal.', image_url: '/images/event/makrab.webp', volume: 1, stage: 0, skills: [{ name: 'Bonding', cost: 1, damage: 5 }], retreatCost: 1, isEX: false },
  { id: 'event-pengkaderan', name: 'Pengkaderan', element: 'Event', rarity: 'Rare', rarityLabel: 'Event', hp: 0, skill_name: 'Mental Baja', skill_effect: 'Menghapus debuff mental dari 1 target.', weakness: 'Dosen', lore: 'Dibentak kating demi mental baja.', image_url: '/images/event/pengkaderan.webp', volume: 1, stage: 0, skills: [{ name: 'Mental Baja', cost: 1, damage: 15, effect: 'heal' }], retreatCost: 1, isEX: false },
  { id: 'event-syukwis', name: 'Syukwis', element: 'Event', rarity: 'Common', rarityLabel: 'Event', hp: 0, skill_name: 'Lulus!', skill_effect: 'Meningkatkan semua stat 50%.', weakness: 'Skripsi', lore: 'Akhirnya lulus, selamat jalan kampus.', image_url: '/images/event/syukwis.webp', volume: 1, stage: 0, skills: [{ name: 'Lulus!', cost: 2, damage: 20, effect: 'atk_buff' }], retreatCost: 2, isEX: false },
  { id: 'event-catudaya', name: 'Catu Daya', element: 'Event', rarity: 'Common', rarityLabel: 'Event', hp: 0, skill_name: 'Catu Daya', skill_effect: 'Power boost.', weakness: 'Lelah', lore: 'Listrik padam.', image_url: '/images/vol2/catu daya.webp', volume: 2, stage: 0, skills: [{ name: 'Catu Daya', cost: 1, damage: 10 }], retreatCost: 1, isEX: false },
  { id: 'event-tamasyaikn', name: 'Tamasya IKN', element: 'Event', rarity: 'Common', rarityLabel: 'Event', hp: 0, skill_name: 'Tamasya IKN', skill_effect: 'Field trip buff.', weakness: 'Lelah', lore: 'Jalan-jalan ke IKN.', image_url: '/images/vol2/tamasya ikn.webp', volume: 2, stage: 0, skills: [{ name: 'IKN Trip', cost: 1, damage: 10, effect: 'def_buff' }], retreatCost: 1, isEX: false },
];

// ─── ITEMS ───
const ITEM_CARDS: CardData[] = [
  { id: 'item-gacoan', name: 'Mie Gacoan', element: 'Item', rarity: 'Common', rarityLabel: 'Item', hp: 0, skill_name: 'Pedas Level 5', skill_effect: 'Tambah 15 ATK, Kurangi 5 HP.', weakness: 'Sakit Perut', lore: 'Mie pedas andalan akhir bulan.', image_url: '/images/item/gacoan.webp', volume: 1, stage: 0, skills: [{ name: 'Pedas Level 5', cost: 1, damage: 15 }], retreatCost: 1, isEX: false },
  { id: 'item-pawon', name: 'Nasi Pawon', element: 'Item', rarity: 'Common', rarityLabel: 'Item', hp: 0, skill_name: 'Kenyang Maksimal', skill_effect: 'Pulihkan 20 HP.', weakness: 'Ngantuk', lore: 'Nasi bungkus penyelamat anak kos.', image_url: '/images/item/pawon.webp', volume: 1, stage: 0, skills: [{ name: 'Kenyang', cost: 1, damage: 5, effect: 'heal' }], retreatCost: 1, isEX: false },
  { id: 'item-salwa', name: 'Salwa', element: 'Item', rarity: 'Rare', rarityLabel: 'Item', hp: 0, skill_name: 'Cemilan Manis', skill_effect: 'Pulihkan 10 HP tiap giliran selama 3 giliran.', weakness: 'Diabetes', lore: 'Jajanan manis legendaris.', image_url: '/images/item/salwa.webp', volume: 1, stage: 0, skills: [{ name: 'Manis', cost: 1, damage: 5, effect: 'heal' }], retreatCost: 1, isEX: false },
  { id: 'item-stek', name: 'Es Teh Kampus', element: 'Item', rarity: 'Common', rarityLabel: 'Item', hp: 0, skill_name: 'Segar Seharian', skill_effect: 'Hapus efek Burnout.', weakness: 'Es Mencair', lore: 'Es teh plastikan yang menemani kelas siang.', image_url: '/images/item/stek.webp', volume: 1, stage: 0, skills: [{ name: 'Segar', cost: 1, damage: 5, effect: 'heal' }], retreatCost: 1, isEX: false },
  { id: 'item-udangkeju', name: 'Udang Keju', element: 'Item', rarity: 'Rare', rarityLabel: 'Item', hp: 0, skill_name: 'Keju Lumer', skill_effect: 'Berikan shield 20 poin.', weakness: 'Kolesterol', lore: 'Makanan sultan untuk ukuran mahasiswa.', image_url: '/images/item/udangkeju.webp', volume: 1, stage: 0, skills: [{ name: 'Keju Lumer', cost: 1, damage: 10, effect: 'def_buff' }], retreatCost: 1, isEX: false },
];

// ─── COMBINED ───

// ─── VOLUME 3 (New Journey Skripsi) ───
const VOLUME_3_CARDS: CardData[] = [
  // Agip — Santuy
  { id: 'agip-young', name: 'Young Agip', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Maba Santuy', skill_effect: 'DEF +10.', weakness: 'Bucin', lore: 'Baru masuk kuliah, belum tau kerasnya tugas.', image_url: '/images/vol3/karakter/agip/maba/young agip.webp', volume: 3 },
  { id: 'agip-satoru', name: 'Agip Satoru', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Limitless Lazy', skill_effect: 'ATK +20, DEF +10.', weakness: 'Bucin', lore: 'Sepanjang langit dan bumi, dialah yang paling mager.', image_url: '/images/vol3/karakter/agip/semsAkhir/agip satoru.webp', volume: 3 },

  // Aqil — Bucin
  { id: 'aqil-silent', name: 'Silent Qil', element: 'Bucin', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 85, skill_name: 'Silent Hype', skill_effect: 'DEF +20. Hype lawan 1 giliran.', weakness: 'Ambis', lore: 'Bicara seperlunya, diamnya mematikan.', image_url: '/images/vol3/karakter/aqil/maba/silent qil.webp', volume: 3 },

  // Bagas — Ambis
  { id: 'bagas-assassins', name: 'Assassins Bagas', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Stealth Coding', skill_effect: 'Ghosting 1 giliran. ATK +15.', weakness: 'Santuy', lore: 'Mengendap-endap di lab komputer demi nilai A.', image_url: '/images/vol3/karakter/bagas/semsAkhir/Assasins bagas.webp', volume: 3 },
  { id: 'bagas-hitman', name: 'Bagas Hitman', element: 'Ambis', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 125, skill_name: 'Contract Completed', skill_effect: 'ATK +45. Ghosting lawan 2 giliran. DEF +10.', weakness: 'Santuy', lore: 'Target terkunci: Skripsi selesai dalam semalam.', image_url: '/images/vol3/karakter/bagas/semsAkhir/bagas hitman.webp', volume: 3 },

  // Baydar — Santuy
  { id: 'baydar-poyoyo', name: 'Baydar Poyoyo', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Joget Poyo', skill_effect: 'Confusion lawan 1 giliran.', weakness: 'Bucin', lore: 'Joget andalan warkop saat bahagia.', image_url: '/images/vol3/karakter/Baydar/kating/baydar poyoyo.webp', volume: 3 },
  { id: 'baydar-pengabdi', name: 'Pengabdi Baydar', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Kopi Hitam', skill_effect: 'DEF +15. Hapus Burnout.', weakness: 'Bucin', lore: 'Pengikut setia dewa warkop.', image_url: '/images/vol3/karakter/Baydar/kating/pengabdi baydar.webp', volume: 3 },
  { id: 'baydar-kalkulus', name: 'Baydar Kalkulus', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Turunan Pertama', skill_effect: 'ATK +15, DEF -5.', weakness: 'Bucin', lore: 'Belajar kalkulus demi bisa ngitung kembalian kopi.', image_url: '/images/vol3/karakter/Baydar/maba/baydar kalkulus.webp', volume: 3 },

  // Brikal — Ambis (Karakter Baru)
  { id: 'brikal-store', name: 'Brikal Store', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Open Order', skill_effect: 'Pulihkan 15 HP.', weakness: 'Santuy', lore: 'Jualan apa saja asal jadi cuan.', image_url: '/images/vol3/karakter/brikal/maba/brikal store.webp', volume: 3 },
  { id: 'brikal-jawa', name: 'Jawa', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Medok Power', skill_effect: 'DEF +25.', weakness: 'Santuy', lore: 'Kejawen sejati, sopan santun nomor satu.', image_url: '/images/vol3/karakter/brikal/kating/jawa.webp', volume: 3 },
  { id: 'brikal-ilahi', name: 'Brikal Ilahi', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 85, skill_name: 'Divine Merchant', skill_effect: 'ATK +20. Pulihkan 20 HP.', weakness: 'Santuy', lore: 'Berdagang dengan restu langit.', image_url: '/images/vol3/karakter/brikal/semsAkhir/brikal ilahi.webp', volume: 3 },

  // Irswanda — Ambis
  { id: 'irswanda-bgn', name: 'Irswanda BGN', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Beginner Luck', skill_effect: 'ATK +10, 50% critical.', weakness: 'Santuy', lore: 'Awal mula petualangan akademik Irswanda.', image_url: '/images/vol3/karakter/irswanda/maba/irswanda bgn.webp', volume: 3 },
  { id: 'irswanda-oo', name: 'Irswanda O-O', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Spectacles View', skill_effect: 'DEF +15.', weakness: 'Santuy', lore: 'Kacamata bulatnya melihat masa depan nilai A.', image_url: '/images/vol3/karakter/irswanda/maba/irswanda o-o.webp', volume: 3 },
  { id: 'irswanda-cyborg', name: 'Akademik Cyborg', element: 'Ambis', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 130, skill_name: 'Auto Skripsi', skill_effect: 'ATK +35, DEF +25. Immune Burnout.', weakness: 'Santuy', lore: 'Manusia setengah robot yang diprogram untuk belajar 24 jam.', image_url: '/images/vol3/karakter/irswanda/semsAkhir/cyborg akademik.webp', volume: 3 },

  // Koten — Santuy
  { id: 'koten-racing', name: 'Koten Racing', element: 'Santuy', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 105, skill_name: 'Speedrun Kuliah', skill_effect: 'ATK +30. Hype diri sendiri 2 giliran.', weakness: 'Bucin', lore: 'Lulus cepat tanpa hambatan tikungan tajam.', image_url: '/images/vol3/karakter/koten/kating/koten racing.webp', volume: 3 },
  { id: 'koten-orkestra', name: 'Koten Orkestra', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Simfoni Mager', skill_effect: 'Confusion lawan 1 giliran.', weakness: 'Bucin', lore: 'Memimpin paduan suara kemageran.', image_url: '/images/vol3/karakter/koten/maba/koten orkestra.webp', volume: 3 },
  { id: 'koten-sleepy', name: 'Sleepy Koten', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Tidur Berdiri', skill_effect: 'DEF +10. Pulihkan 10 HP.', weakness: 'Bucin', lore: 'Tidur di sela-sela dosen menerangkan.', image_url: '/images/vol3/karakter/koten/maba/sleepy koten.webp', volume: 3 },

  // Mikel — Santuy
  { id: 'mikel-sus', name: 'Mikel Sus', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Suspicious Look', skill_effect: 'DEF +15. Mager lawan 1 giliran.', weakness: 'Bucin', lore: 'Mencurigakan, sepertinya titip absen.', image_url: '/images/vol3/karakter/mikel/maba/mikel sus.webp', volume: 3 },
  { id: 'mikel-tomsamchong', name: 'Mikel Tomsamchong', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Tomsamchong Kick', skill_effect: 'ATK +40. Burnout lawan 2 giliran.', weakness: 'Bucin', lore: 'Penguasa warkop legendaris dengan tendangan maut.', image_url: '/images/vol3/karakter/mikel/semsAkhir/mikel tomsamchong.webp', volume: 3 },

  // Pebasket — Bucin
  { id: 'pebasket-lgbt', name: 'Pebasket LGBT', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Rainbow Dunk', skill_effect: 'ATK +15, 30% miss.', weakness: 'Ambis', lore: 'Pebasket warna-warni yang jago nge-dunk.', image_url: '/images/vol3/karakter/pebasket/maba/pebasket lgbt.webp', volume: 3 },
  { id: 'pebasket-assasintio', name: 'Assasin Tio', element: 'Bucin', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Hidden Layup', skill_effect: 'ATK +20. DEF +10.', weakness: 'Ambis', lore: 'Layup tersembunyi dari balik bayang-bayang ring.', image_url: '/images/vol3/karakter/pebasket/semsAkhir/assasin tio.webp', volume: 3 },
  { id: 'pebasket-pisangijo', name: 'Pisang Ijo', element: 'Bucin', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 95, skill_name: 'Segar Manis', skill_effect: 'Pulihkan 30 HP. Hapus Burnout.', weakness: 'Ambis', lore: 'Takjil legendaris penenang jiwa pebasket.', image_url: '/images/vol3/karakter/pebasket/semsAkhir/pisang ijo.webp', volume: 3 },
  { id: 'pebasket-silentmajority', name: 'Silent Majority', element: 'Bucin', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Quiet Power', skill_effect: 'DEF +20. ATK +20.', weakness: 'Ambis', lore: 'Mereka yang diam tapi mematikan saat bertanding.', image_url: '/images/vol3/karakter/pebasket/semsAkhir/silent majority.webp', volume: 3 },

  // Rapli — Santuy (Karakter Baru)
  { id: 'rapli-turu', name: 'Rapli Turu', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Turu Eternal', skill_effect: 'DEF +20. Pulihkan 10 HP.', weakness: 'Bucin', lore: 'Rebahan adalah jalan hidupku.', image_url: '/images/vol3/karakter/rapli/kating/rapli turu.webp', volume: 3 },
  { id: 'rapli-opm', name: 'Rapli OPM', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'One Punch Turu', skill_effect: 'ATK +20. Mager 1 giliran.', weakness: 'Bucin', lore: 'Pukulan kuat tapi langsung ngantuk.', image_url: '/images/vol3/karakter/rapli/maba/rapli opm.webp', volume: 3 },
  { id: 'rapli-mikir', name: 'Mikir Kids', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Brain Storm', skill_effect: 'ATK +25.', weakness: 'Bucin', lore: 'Berpikir keras mencari alasan bolos.', image_url: '/images/vol3/karakter/rapli/semsAkhir/mikir kids.webp', volume: 3 },

  // Zaka — Bucin
  { id: 'zaka-serlok', name: 'Zaka Serlok', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Location Locked', skill_effect: 'DEF +15. Hype 1 giliran.', weakness: 'Ambis', lore: 'Langsung share location begitu diajak nongkrong.', image_url: '/images/vol3/karakter/zaka/kating/zaka serlok.webp', volume: 3 },
  { id: 'zaka-meteorbegin', name: 'Meteor The Beginning', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Stardust Fall', skill_effect: 'ATK +15.', weakness: 'Ambis', lore: 'Awal mula meteor yang akan menghancurkan hati.', image_url: '/images/vol3/karakter/zaka/maba/meteor the beggining.webp', volume: 3 },
  { id: 'zaka-nippon', name: 'Nippon Des Ka', element: 'Bucin', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 110, skill_name: 'Anime Attack', skill_effect: 'ATK +35. Confusion lawan 2 giliran.', weakness: 'Ambis', lore: 'Wibu sejati yang bertarung dengan kekuatan anime.', image_url: '/images/vol3/karakter/zaka/semsAkhir/nippon des ka.webp', volume: 3 },

  // Zaki — Ambis
  { id: 'zaki-whatsapp', name: 'Zaki Whatsapp', element: 'Ambis', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Spam Chat', skill_effect: 'ATK +25. Mager lawan 1 giliran.', weakness: 'Santuy', lore: 'Menghubungi ketua kelas 24 jam nonstop.', image_url: '/images/vol3/karakter/zaki/kating/zaki whatsapp.webp', volume: 3 },
  { id: 'zaki-pepsodent', name: 'Zaki Pepsodent', element: 'Ambis', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 95, skill_name: 'Senyum Cemerlang', skill_effect: 'DEF +25. Confusion lawan 1 giliran.', weakness: 'Santuy', lore: 'Gigi putih bersih membuat lawan silau.', image_url: '/images/vol3/karakter/zaki/kating/zaki pepsodent.webp', volume: 3 },
  { id: 'zaki-lilz', name: 'Lil Z', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 85, skill_name: 'Lil Rhymes', skill_effect: 'ATK +20.', weakness: 'Santuy', lore: 'Rapper cilik kebanggaan angkatan.', image_url: '/images/vol3/karakter/zaki/semsAkhir/lil z.webp', volume: 3 },

  // ─── EXCLUSIVE LEGENDARY (Myth's Series) — Vol 3 ───
  { id: 'baydar-monk', name: 'Baydar The Enchatments', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 150, skill_name: 'Ceramah Kitab Santuy', skill_effect: 'ATK +30. Hapus semua status buruk kawan di bench. Anti-Sleep 2 giliran.', weakness: 'Bucin', lore: 'Wujud mahasiswa yang berhasil damai dengan akademiknya dan mencapai Nirvana. Immunity total dari Sleep, Burnout, dan Ghosting.', image_url: '/images/vol3/karakter/legendary/baydar monk.png', volume: 3, stage: 2, skills: [{ name: 'Ceramah Kitab Santuy', cost: 3, damage: 80, effect: 'heal' }], retreatCost: 3, evolvesFrom: 'baydar-kating', isEX: true },
  { id: 'mikel-007', name: 'Mikel 007', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 160, skill_name: 'Operasi Senyap Kilo', skill_effect: 'ATK +40. Forced Discard 2 kartu lawan. Intip 3 kartu teratas dek lawan.', weakness: 'Bucin', lore: 'Bermodalkan jaket merah, Mikel 007 tahu segalanya: bocoran soal, alasan komting telat, sampai dana makrab yang hilang misterius.', image_url: '/images/vol3/karakter/legendary/mikel 007.png', volume: 3, stage: 2, skills: [{ name: 'Operasi Senyap Kilo', cost: 3, damage: 110, effect: 'ghosting' }], retreatCost: 3, evolvesFrom: 'mikel-maba', isEX: true },
  { id: 'zaka-jojo', name: 'Jojo Pt.10 : Kilo Experience', element: 'Bucin', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 160, skill_name: 'ORAORAORA!!!', skill_effect: 'ATK +45. Splash 20 ke seluruh bench lawan. Burnout diri sendiri.', weakness: 'Ambis', lore: 'Mantan mafia kilo yang membangkang dan melawan bos-nya. Stand: Golden Experience. Choice Effect: Damage Reduction 20 / draw 1.', image_url: '/images/vol3/karakter/legendary/zaka jojo.png', volume: 3, stage: 2, skills: [{ name: 'ORAORAORA!!!', cost: 4, damage: 140, effect: 'burnout' }], retreatCost: 3, evolvesFrom: 'zaka-maba', isEX: true },

  // ─── SPECIAL MYTHICAL (Tag Team) — Eksklusif Vol 3 ───
  { id: 'mythical-sagabmikel', name: 'Sagab & Mikel S.KOM', element: 'Santuy', rarity: 'Special Mythical', rarityLabel: 'IPK Cumlaude', hp: 200, skill_name: 'Kombinasi: Deadline Mutlak', skill_effect: 'ATK +50. Splash 30 ke seluruh bench lawan. Burnout diri sendiri.', weakness: 'Bucin', lore: 'Duo legendaris yang menyelesaikan deadline mutlak bersama. Coretan Suci Tomsamchong + Deadline Mutlak.', image_url: '/images/vol3/karakter/mythical/sagab-mikel.png', volume: 3, stage: 2, skills: [{ name: 'Coretan Suci Tomsamchong', cost: 3, damage: 80, effect: 'heal' }, { name: 'Kombinasi: Deadline Mutlak', cost: 4, damage: 160, effect: 'burnout' }], retreatCost: 3, evolvesFrom: undefined, isEX: true },
  { id: 'mythical-masterslave', name: 'Master x Slave S.KOM', element: 'Bucin', rarity: 'Special Mythical', rarityLabel: 'IPK Cumlaude', hp: 200, skill_name: 'Kombinasi: Deadline Mutlak', skill_effect: 'ATK +45. Ghosting lawan. Seret 1 kartu bench lawan ke depan + Sleep.', weakness: 'Ambis', lore: 'Tuan dan budak yang saling melengkapi. PC dijual, nego tipis.', image_url: '/images/vol3/karakter/mythical/master-slave.png', volume: 3, stage: 2, skills: [{ name: 'Jedag-Jedug', cost: 2, damage: 60, effect: 'ghosting' }, { name: 'Kombinasi: Deadline Mutlak', cost: 4, damage: 130, effect: 'mager' }], retreatCost: 3, evolvesFrom: undefined, isEX: true },
];

// ─── COMBINED ───
export const ALL_CARDS: CardData[] = [
  ...AMBIS_CARDS,
  ...SANTUY_CARDS,
  ...BUCIN_CARDS,
  ...IRSWANDA_CARDS,
  ...VOLUME_3_CARDS,
  ...EVENT_CARDS,
  ...ITEM_CARDS,
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
  mythical:   ALL_CARDS.filter(c => c.rarity === 'Special Mythical'),
};

// Gacha slot probabilities (5 slots per pack)
export const SLOT_CONFIG = [
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0, mythical: 0 },   // Slot 1 (Max SR)
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0, mythical: 0 },   // Slot 2 (Max SR)
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0, mythical: 0 },   // Slot 3 (Max SR)
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0, mythical: 0 },   // Slot 4 (Max SR)
  { common: 70, rare: 18, superRare: 7, ultraRare: 4.5, legendary: 0.4, mythical: 0.1 }, // Slot 5 (Can yield UR/Legendary/Mythical)
];

export const PITY_CONFIG = { common: 0, rare: 0, superRare: 65, ultraRare: 25, legendary: 7.5, mythical: 2.5 };

export function pickRarity(config: { common: number; rare: number; superRare: number; ultraRare: number; legendary: number; mythical: number }): CardData['rarity'] {
  const roll = Math.random() * 100; // Use precise float for accurate decimal percentages
  if (roll < config.common) return 'Common';
  if (roll < config.common + config.rare) return 'Rare';
  if (roll < config.common + config.rare + config.superRare) return 'Super Rare';
  if (roll < config.common + config.rare + config.superRare + config.ultraRare) return 'Ultra Rare';
  if (roll < config.common + config.rare + config.superRare + config.ultraRare + config.legendary) return 'Exclusive Legendary';
  return 'Special Mythical';
}

export function pickRandomCardFromPool(rarity: CardData['rarity'], volume: number = 1): CardData {
  const poolKey = rarity === 'Special Mythical' ? 'mythical' : rarity === 'Exclusive Legendary' ? 'legendary' : rarity === 'Super Rare' ? 'superRare' : rarity === 'Ultra Rare' ? 'ultraRare' : rarity.toLowerCase() as keyof typeof RARITY_POOLS;
  const allInRarity = RARITY_POOLS[poolKey] || [];
  const pool = allInRarity.filter(c => (c.volume || 1) === volume);
  
  if (!pool || pool.length === 0) {
    // Fallback
    const fallbackPool = RARITY_POOLS.common.filter(c => (c.volume || 1) === volume);
    if (!fallbackPool.length) return RARITY_POOLS.common[0];
    return fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generatePull(volume: number = 1, isPityActive: boolean = false): CardData[] {
  return SLOT_CONFIG.map((config, index) => {
    const finalConfig = (isPityActive && (index === 2 || index === 3 || index === 4)) ? PITY_CONFIG : config;
    const rarity = pickRarity(finalConfig);
    const card = pickRandomCardFromPool(rarity, volume);
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
  'Special Mythical': '#ff6bcb',
};

export const ELEMENT_COLORS: Record<string, string> = {
  Ambis: '#fe2f2f',
  Santuy: '#d7b73b',
  Bucin: '#7333f1',
  Event: '#1b5bff', // Blue for event
  Item: '#00cc66',  // Green for item
};
