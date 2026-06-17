// ─────────────────────────────────────────────
// MASTER CARD DATABASE
// Element assignments from: goc tcg/character/ folder structure
// Rarity assignments from: goc rarity.md
// ─────────────────────────────────────────────

export interface CardData {
  id: string;
  name: string;
  element: 'Ambis' | 'Santuy' | 'Bucin' | 'Event' | 'Item';
  rarity: 'Common' | 'Rare' | 'Super Rare' | 'Ultra Rare' | 'Exclusive Legendary';
  rarityLabel: string; // IPK label
  hp: number;
  skill_name: string;
  skill_effect: string;
  weakness: string;
  lore: string;
  image_url: string;
  imageUrl?: string;
  volume?: number;
}

// ─── AMBIS (Bagas, Nopal, Zaki) ───

const AMBIS_CARDS: CardData[] = [
  // Bagas — Ambis
  { id: 'bagas-maba', name: 'Sleepy Bagas', element: 'Ambis', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 90, skill_name: 'Tidur Dalam', skill_effect: 'Pulihkan 30 HP. Immune Burnout 1 giliran.', weakness: 'Santuy', lore: 'Jam 8 pagi masih di kos. Tapi IPK? 4.0.', image_url: '/images/character/bagas/maba/sleepy bagas.webp', volume: 1 },
  { id: 'bagas-kating', name: 'Bagas Kating', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 50, skill_name: 'Catatan Rapi', skill_effect: 'Tambah 10 DEF.', weakness: 'Santuy', lore: 'Rajin mencatat tapi tidak pernah baca ulang.', image_url: '/images/character/bagas/kating/kartu basic.webp', volume: 1 },
  { id: 'bagas-semsakhir', name: 'RRQ Sagab', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Pro Player Mode', skill_effect: 'Hype! +20 ATK, -10 HP/turn.', weakness: 'Santuy', lore: 'Skripsi belum bab 1, tapi rank Mythic Glory.', image_url: '/images/character/bagas/semsAkhir/rrq sagab.webp', volume: 1 },

  // Nopal — Ambis
  { id: 'nopal-maba', name: 'Nopal Skinny', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Chat Tengah Malam', skill_effect: 'Turunkan ATK lawan 10.', weakness: 'Santuy', lore: 'Nilai IP 2.5 tapi chat doi dibalas dalam 0.3 detik.', image_url: '/images/character/nopal/maba/nopal skinny.webp', volume: 1 },
  { id: 'nopal-kating', name: 'Nopal P Valo', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Coding Hati Baru', skill_effect: 'Target Hype! +20 ATK, -10 HP/turn.', weakness: 'Santuy', lore: 'Mantan jadi bahan skripsi. Sakit sekaligus produktif.', image_url: '/images/character/nopal/kating/nopal p valo.webp', volume: 1 },
  { id: 'nopal-semsakhir', name: 'Nopal x Bitracom', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Sponsor Deal', skill_effect: 'Tambah 25 ATK. Ghosting lawan 1 giliran.', weakness: 'Santuy', lore: 'Dari anak kos jadi brand ambassador. Level up.', image_url: '/images/character/nopal/semsAkhir/nopal x bitracom.webp', volume: 1 },

  // Zaki — Ambis
  { id: 'zaki-maba', name: 'Zaki', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Catatan Kilat', skill_effect: 'Tambah 10 DEF satu giliran.', weakness: 'Santuy', lore: 'Baru seminggu kuliah tapi udah bawa tas penuh buku.', image_url: '/images/character/zaki/maba/zaki.webp', volume: 1 },
  { id: 'zaki-kating', name: 'Zaki FF', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 60, skill_name: 'Booyah!', skill_effect: 'ATK +15, critical 20% chance double.', weakness: 'Santuy', lore: 'Free Fire-nya pro, kuliahnya... nanti aja.', image_url: '/images/character/zaki/kating/zaki ff.webp', volume: 1 },
  { id: 'zaki-noir', name: 'Zaki Noir', element: 'Ambis', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 95, skill_name: 'Dark Investigation', skill_effect: 'Lihat semua kartu lawan. Burnout 1 giliran.', weakness: 'Santuy', lore: 'Versi gelap dari Zaki. Misterius tapi pintar.', image_url: '/images/character/zaki/semsAkhir/zaki noir.webp', volume: 1 },
  { id: 'zaki-cakahima', name: 'Zaki Cakahima', element: 'Ambis', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Ketua Himpunan', skill_effect: 'Burnout semua lawan 2 giliran. +30 ATK.', weakness: 'Santuy', lore: 'Dari maba sampai ketua. Legenda yang tak tergantikan.', image_url: '/images/character/zaki/semsAkhir/zaki cakahima.webp', volume: 1 },
  // Zaki - Vol 2
  { id: 'zaki-ocean', name: 'Zaki Ocean', element: 'Ambis', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 0, skill_name: 'Zaki Ocean', skill_effect: '', weakness: 'Santuy', lore: '', image_url: '/images/vol2/zaki ocean.webp', volume: 2 },

];

// ─── SANTUY (Baydar, Koten, Mikel) ───

const SANTUY_CARDS: CardData[] = [
  // Baydar — Santuy
  { id: 'baydar-maba', name: 'Baydar Maba', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Tidur Siang', skill_effect: 'Pulihkan 10 HP.', weakness: 'Bucin', lore: 'Masternya tidur di perpustakaan tanpa rasa bersalah.', image_url: '/images/character/baydar/maba/kartu basic.webp', volume: 1 },
  { id: 'baydar-faker', name: 'Baydar Faker', element: 'Santuy', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 100, skill_name: 'Faker Mode', skill_effect: 'Ghosting lawan 2 giliran. +25 ATK.', weakness: 'Bucin', lore: 'Looks like a noob, plays like a god.', image_url: '/images/character/baydar/maba/baydar faker.webp', volume: 1 },
  { id: 'baydar-kating', name: 'Baydar Kating', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Sabda Warkop', skill_effect: 'Mager lawan 2 giliran.', weakness: 'Bucin', lore: 'Senior yang paling ditakuti di warkop.', image_url: '/images/character/baydar/kating/baydar-kating.webp', volume: 1 },
  { id: 'baydar-pemandu', name: 'Baydar Pemandu', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Pemandu Ospek', skill_effect: 'Mager semua lawan 1 giliran. +15 DEF.', weakness: 'Bucin', lore: 'Suaranya menggelegar di lapangan. Maba gemetar.', image_url: '/images/character/baydar/semsAkhir/baydar pemandu.webp', volume: 1 },
  { id: 'baydar-semsakhir', name: 'Baydar Semester Akhir', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Sabda Dewa Warkop', skill_effect: 'Ghosting lawan 2 giliran. Immune Burnout.', weakness: 'Bucin', lore: 'Legenda warung kopi. Tidak ada tugas yang bertahan.', image_url: '/images/character/baydar/semsAkhir/baydar-semsakhir.webp', volume: 1 },

  // Koten — Santuy
  { id: 'koten-maba', name: 'Koten', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Belajar Kelompok', skill_effect: 'Tambah 15 ATK.', weakness: 'Bucin', lore: 'Udah hapal silabus sebelum ospek dimulai.', image_url: '/images/character/koten/maba/koten.webp', volume: 1 },
  { id: 'koten-amba', name: 'Amba Koten', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 90, skill_name: 'Ambasador Mode', skill_effect: 'Tambah 20 ATK dan 15 DEF.', weakness: 'Bucin', lore: 'Duta kampus yang selalu tampil rapi dan berwibawa.', image_url: '/images/character/koten/maba/amba koten.webp', volume: 1 },
  { id: 'koten-kating', name: 'Koten Melet', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Melet Attack', skill_effect: 'ATK +10, lawan confusion 1 giliran.', weakness: 'Bucin', lore: 'Ekspresinya menyebalkan tapi efektif.', image_url: '/images/character/koten/kating/koten melet.webp', volume: 1 },
  { id: 'koten-demon', name: 'Koten Demon King', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 130, skill_name: 'Final Boss Mode', skill_effect: 'Burnout semua lawan. +30 ATK. Immune 1 giliran.', weakness: 'Bucin', lore: 'IP 4.0. Tidak punya teman. Tidak butuh.', image_url: '/images/character/koten/semsAkhir/koten demon king.webp', volume: 1 },

  // Mikel — Santuy
  { id: 'mikel-maba', name: 'Mikel', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Mager Total', skill_effect: 'Kunci lawan (Mager 1 giliran).', weakness: 'Bucin', lore: 'Filosofinya: kenapa berdiri kalau bisa rebahan.', image_url: '/images/character/mikel/maba/mikel.webp', volume: 1 },
  { id: 'mikel-kating', name: 'Mikel Far From Home', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Jauh Dari Rumah', skill_effect: 'DEF +20, tapi Mager diri sendiri 1 giliran.', weakness: 'Bucin', lore: 'Anak rantau yang selalu kangen masakan ibu.', image_url: '/images/character/mikel/kating/mikel far from home.webp', volume: 1 },
  { id: 'mikel-magneto', name: 'Mikel Magneto', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Magnetic Force', skill_effect: 'Tarik lawan ke arena. Ghosting 2 giliran.', weakness: 'Bucin', lore: 'Kekuatannya bukan magnetik, tapi malas yang menular.', image_url: '/images/character/mikel/semsAkhir/mikel magneto.webp', volume: 1 },
  // Agip - Vol 2
  { id: 'agip-maba', name: 'Agip', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Agip', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/agip.webp', volume: 2 },
  { id: 'agip-asistensi', name: 'Agip Asistensi', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Agip Asistensi', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/agip asistensi.webp', volume: 2 },
  { id: 'agip-prof', name: 'Prof Agip', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 0, skill_name: 'Prof Agip', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/prof agip.webp', volume: 2 },
  { id: 'agip-demon', name: 'Demon King Sangata', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 0, skill_name: 'Demon King Sangata', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/demon king sangata.webp', volume: 2 },

  // Baydar - Vol 2
  { id: 'baydar-pestapora', name: 'Baydar Pestapora', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 0, skill_name: 'Baydar Pestapora', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/baydar pestapora.webp', volume: 2 },
  { id: 'baydar-asasin', name: 'Asasin Baydar', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 0, skill_name: 'Asasin Baydar', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/asasin baydar.webp', volume: 2 },
  { id: 'baydar-sarjana', name: 'Sarjana 3 Pikiran', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 0, skill_name: 'Sarjana 3 Pikiran', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/sarjana 3 pikiran.webp', volume: 2 },

  // Koten - Vol 2
  { id: 'koten-kesurupan', name: 'Koten Kesurupan', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Koten Kesurupan', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/koten kesurupan.webp', volume: 2 },
  { id: 'koten-sybau', name: 'Koten Sybau', element: 'Santuy', rarity: 'Super Rare', rarityLabel: 'IPK 3.5', hp: 0, skill_name: 'Koten Sybau', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/koten sybau.webp', volume: 2 },
  { id: 'koten-poseidon', name: 'Koten Poseidon', element: 'Santuy', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 0, skill_name: 'Koten Poseidon', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/koten poseidon.webp', volume: 2 },

  // Mikel - Vol 2
  { id: 'mikel-intel', name: 'Mikel Intel', element: 'Santuy', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Mikel Intel', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/mikel intel.webp', volume: 2 },
  { id: 'mikel-okegas', name: 'Mikel Okegas', element: 'Santuy', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 0, skill_name: 'Mikel Okegas', skill_effect: '', weakness: 'Bucin', lore: '', image_url: '/images/vol2/mikel okegas.webp', volume: 2 },

];

// ─── BUCIN (Pebasket, Zaka) ───

const BUCIN_CARDS: CardData[] = [
  // Pebasket — Bucin
  { id: 'pebasket-maba', name: 'Pebasket', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Jump Shot', skill_effect: 'ATK +15, tapi miss 30% chance.', weakness: 'Ambis', lore: 'Di lapangan garang, di chat doi malu-malu.', image_url: '/images/character/pebasket/maba/pebasket.webp', volume: 1 },
  { id: 'pebasket-kating', name: 'Pebasket Miss Her', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Miss Her', skill_effect: 'Sacrifice 10 HP → ATK +25.', weakness: 'Ambis', lore: 'Setiap three-pointer didedikasikan untuk mantannya.', image_url: '/images/character/pebasket/kating/pebasket miss her.webp', volume: 1 },
  { id: 'pebasket-naga', name: 'Pebasket Naga', element: 'Bucin', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 80, skill_name: 'Dragon Dunk', skill_effect: 'ATK +30. Burnout lawan 1 giliran.', weakness: 'Ambis', lore: 'Evolusi terakhir. Dunk-nya menghancurkan segalanya.', image_url: '/images/character/pebasket/semsAkhir/pebasket naga.webp', volume: 1 },
  { id: 'pebasket-tio', name: 'Pebasket Tio', element: 'Bucin', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Ultimate Slam', skill_effect: 'ATK +40. Ghosting lawan 2 giliran. Immune Burnout.', weakness: 'Ambis', lore: 'MVP sepanjang masa. Legenda lapangan basket kampus.', image_url: '/images/character/pebasket/semsAkhir/pebasket tio.webp', volume: 1 },

  // Zaka — Bucin
  { id: 'zaka-maba', name: 'Verfil Zaka', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 40, skill_name: 'Profile Stalking', skill_effect: 'Lihat 1 kartu lawan.', weakness: 'Ambis', lore: 'Verified di semua sosmed. Followers? Doi doang.', image_url: '/images/character/zaka/maba/verfil.webp', volume: 1 },
  { id: 'zaka-kating', name: 'Rusdi', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 55, skill_name: 'Sweet Talk', skill_effect: 'Turunkan DEF lawan 15.', weakness: 'Ambis', lore: 'Gombalannya receh tapi selalu berhasil.', image_url: '/images/character/zaka/kating/rusdi.webp', volume: 1 },
  { id: 'zaka-semsakhir', name: 'Meteor Zaka', element: 'Bucin', rarity: 'Exclusive Legendary', rarityLabel: 'IPK 4 EX', hp: 120, skill_name: 'Meteor Strike', skill_effect: 'ATK +35. Burnout semua lawan 2 giliran.', weakness: 'Ambis', lore: 'Jatuh dari langit, menghancurkan hati semua orang.', image_url: '/images/character/zaka/semsAkhir/meteor.webp', volume: 1 },
  // Aqil - Vol 2
  { id: 'aqil-maba', name: 'Aqil', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Aqil', skill_effect: '', weakness: 'Ambis', lore: '', image_url: '/images/vol2/aqil.webp', volume: 2 },
  { id: 'aqil-parttimer', name: 'Aqil Part Timer', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Aqil Part Timer', skill_effect: '', weakness: 'Ambis', lore: '', image_url: '/images/vol2/aqil part timer.webp', volume: 2 },
  { id: 'aqil-agent', name: 'Agent Qil', element: 'Bucin', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 0, skill_name: 'Agent Qil', skill_effect: '', weakness: 'Ambis', lore: '', image_url: '/images/vol2/agent qil.webp', volume: 2 },

  // Pebasket - Vol 2
  { id: 'pebasket-cina', name: 'Pebasket Cina', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Pebasket Cina', skill_effect: '', weakness: 'Ambis', lore: '', image_url: '/images/vol2/pebasket cina.webp', volume: 2 },
  { id: 'pebasket-tioclaude', name: 'Tio Claude', element: 'Bucin', rarity: 'Ultra Rare', rarityLabel: 'IPK 4', hp: 0, skill_name: 'Tio Claude', skill_effect: '', weakness: 'Ambis', lore: '', image_url: '/images/vol2/tio claude.webp', volume: 2 },

  // Zaka - Vol 2
  { id: 'zaka-epstein', name: 'Zaka Epstein', element: 'Bucin', rarity: 'Common', rarityLabel: 'IPK 1', hp: 0, skill_name: 'Zaka Epstein', skill_effect: '', weakness: 'Ambis', lore: '', image_url: '/images/vol2/zaka epstein.webp', volume: 2 },

];

// ─── IRSWANDA (standalone — treat as Ambis per original placement) ───

const IRSWANDA_CARDS: CardData[] = [
  { id: 'irswanda-maba', name: 'Irswanda', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 45, skill_name: 'Duality', skill_effect: 'Tambah 10 ATK dan 10 DEF.', weakness: 'Santuy', lore: 'Dua kepribadian, satu tujuan: IPK 4.0.', image_url: '/images/character/irswanda/maba/duality.webp', volume: 1 },
  { id: 'irswanda-kating', name: 'Lil Wanda', element: 'Ambis', rarity: 'Common', rarityLabel: 'IPK 1', hp: 60, skill_name: 'Kuis Dadakan', skill_effect: 'Burnout lawan 2 giliran.', weakness: 'Santuy', lore: 'Tugasnya ada di silabus. Kamu yang tidak baca.', image_url: '/images/character/irswanda/kating/lil wanda.webp', volume: 1 },
  { id: 'irswanda-semsakhir', name: 'Preman Exp', element: 'Ambis', rarity: 'Rare', rarityLabel: 'IPK 2.5', hp: 85, skill_name: 'Exp Grinding', skill_effect: 'ATK +20. Hype mode aktif.', weakness: 'Santuy', lore: 'Dari preman jadi the exp. Level up is real.', image_url: '/images/character/irswanda/semsAkhir/preman exp.webp', volume: 1 },
];

// ─── EVENTS ───
const EVENT_CARDS: CardData[] = [
  { id: 'event-makrab', name: 'Makrab', element: 'Event', rarity: 'Common', rarityLabel: 'Event', hp: 0, skill_name: 'Bonding', skill_effect: 'Menambah sinergi seluruh kartu sebesar 10%.', weakness: 'Lelah', lore: 'Malam keakraban, di mana semua orang jadi sok kenal.', image_url: '/images/event/makrab.webp', volume: 1 },
  { id: 'event-pengkaderan', name: 'Pengkaderan', element: 'Event', rarity: 'Rare', rarityLabel: 'Event', hp: 0, skill_name: 'Mental Baja', skill_effect: 'Menghapus debuff mental dari 1 target.', weakness: 'Dosen', lore: 'Dibentak kating demi mental baja.', image_url: '/images/event/pengkaderan.webp', volume: 1 },
  { id: 'event-syukwis', name: 'Syukwis', element: 'Event', rarity: 'Super Rare', rarityLabel: 'Event', hp: 0, skill_name: 'Lulus!', skill_effect: 'Meningkatkan semua stat 50%.', weakness: 'Skripsi', lore: 'Akhirnya lulus, selamat jalan kampus.', image_url: '/images/event/syukwis.webp', volume: 1 },
  { id: 'event-catudaya', name: 'Catu Daya', element: 'Event', rarity: 'Common', rarityLabel: 'Event', hp: 0, skill_name: 'Catu Daya', skill_effect: '', weakness: 'Lelah', lore: '', image_url: '/images/vol2/catu daya.webp', volume: 2 },
  { id: 'event-tamasyaikn', name: 'Tamasya IKN', element: 'Event', rarity: 'Common', rarityLabel: 'Event', hp: 0, skill_name: 'Tamasya IKN', skill_effect: '', weakness: 'Lelah', lore: '', image_url: '/images/vol2/tamasya ikn.webp', volume: 2 },

];

// ─── ITEMS ───
const ITEM_CARDS: CardData[] = [
  { id: 'item-gacoan', name: 'Mie Gacoan', element: 'Item', rarity: 'Common', rarityLabel: 'Item', hp: 0, skill_name: 'Pedas Level 5', skill_effect: 'Tambah 15 ATK, Kurangi 5 HP.', weakness: 'Sakit Perut', lore: 'Mie pedas andalan akhir bulan.', image_url: '/images/item/gacoan.webp', volume: 1 },
  { id: 'item-pawon', name: 'Nasi Pawon', element: 'Item', rarity: 'Common', rarityLabel: 'Item', hp: 0, skill_name: 'Kenyang Maksimal', skill_effect: 'Pulihkan 20 HP.', weakness: 'Ngantuk', lore: 'Nasi bungkus penyelamat anak kos.', image_url: '/images/item/pawon.webp', volume: 1 },
  { id: 'item-salwa', name: 'Salwa', element: 'Item', rarity: 'Rare', rarityLabel: 'Item', hp: 0, skill_name: 'Cemilan Manis', skill_effect: 'Pulihkan 10 HP tiap giliran selama 3 giliran.', weakness: 'Diabetes', lore: 'Jajanan manis legendaris.', image_url: '/images/item/salwa.webp', volume: 1 },
  { id: 'item-stek', name: 'Es Teh Kampus', element: 'Item', rarity: 'Common', rarityLabel: 'Item', hp: 0, skill_name: 'Segar Seharian', skill_effect: 'Hapus efek Burnout.', weakness: 'Es Mencair', lore: 'Es teh plastikan yang menemani kelas siang.', image_url: '/images/item/stek.webp', volume: 1 },
  { id: 'item-udangkeju', name: 'Udang Keju', element: 'Item', rarity: 'Rare', rarityLabel: 'Item', hp: 0, skill_name: 'Keju Lumer', skill_effect: 'Berikan shield 20 poin.', weakness: 'Kolesterol', lore: 'Makanan sultan untuk ukuran mahasiswa.', image_url: '/images/item/udangkeju.webp', volume: 1 },
];

// ─── COMBINED ───
export const ALL_CARDS: CardData[] = [
  ...AMBIS_CARDS,
  ...SANTUY_CARDS,
  ...BUCIN_CARDS,
  ...IRSWANDA_CARDS,
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
};

// Gacha slot probabilities (5 slots per pack)
export const SLOT_CONFIG = [
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0 },   // Slot 1 (Max SR)
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0 },   // Slot 2 (Max SR)
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0 },   // Slot 3 (Max SR)
  { common: 70, rare: 20, superRare: 10, ultraRare: 0, legendary: 0 },   // Slot 4 (Max SR)
  { common: 70, rare: 18, superRare: 7, ultraRare: 4.5, legendary: 0.5 }, // Slot 5 (Can yield UR/Legendary)
];

export const PITY_CONFIG = { common: 0, rare: 0, superRare: 55, ultraRare: 35, legendary: 10 };

export function pickRarity(config: { common: number; rare: number; superRare: number; ultraRare: number; legendary: number }): CardData['rarity'] {
  const roll = Math.random() * 100; // Use precise float for accurate decimal percentages
  if (roll < config.common) return 'Common';
  if (roll < config.common + config.rare) return 'Rare';
  if (roll < config.common + config.rare + config.superRare) return 'Super Rare';
  if (roll < config.common + config.rare + config.superRare + config.ultraRare) return 'Ultra Rare';
  return 'Exclusive Legendary';
}

export function pickRandomCardFromPool(rarity: CardData['rarity'], volume: number = 1): CardData {
  const allInRarity = RARITY_POOLS[rarity === 'Exclusive Legendary' ? 'legendary' : rarity === 'Super Rare' ? 'superRare' : rarity === 'Ultra Rare' ? 'ultraRare' : rarity.toLowerCase() as keyof typeof RARITY_POOLS] || [];
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
};

export const ELEMENT_COLORS: Record<string, string> = {
  Ambis: '#fe2f2f',
  Santuy: '#d7b73b',
  Bucin: '#7333f1',
  Event: '#1b5bff', // Blue for event
  Item: '#00cc66',  // Green for item
};
