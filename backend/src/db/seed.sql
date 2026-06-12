USE god_of_college;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE cards;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO cards (id, name, element, stage, hp, skill_name, skill_effect, weakness, lore, rarity_weight, image_url) VALUES

-- Stage 0 (Maba/Common) — 70% pool
(UUID(), 'Rizky si Ospek', 'Ambis', 0, 40, 'Catatan Kilat', 'Tambah 10 DEF satu giliran.', 'Santuy', 'Baru seminggu kuliah tapi udah bawa tas penuh buku.', 70, '/images/rizky.png'),
(UUID(), 'Dinda Santai', 'Santuy', 0, 40, 'Tidur Siang', 'Pulihkan 10 HP.', 'Bucin', 'Masternya tidur di perpustakaan tanpa rasa bersalah.', 70, '/images/dinda.png'),
(UUID(), 'Fajar Bucin', 'Bucin', 0, 40, 'Chat Tengah Malam', 'Turunkan ATK lawan 10.', 'Ambis', 'Nilai IP 2.5 tapi chat doi dibalas dalam 0.3 detik.', 70, '/images/fajar.png'),
(UUID(), 'Siti Maba Ambis', 'Ambis', 0, 45, 'Belajar Kelompok', 'Tambah 15 ATK.', 'Santuy', 'Udah hapal silabus sebelum ospek dimulai.', 70, '/images/siti.png'),
(UUID(), 'Budi Rebahan', 'Santuy', 0, 45, 'Mager Total', 'Kunci lawan (Mager 1 giliran).', 'Bucin', 'Filosofinya: kenapa berdiri kalau bisa rebahan.', 70, '/images/budi.png'),

-- Stage 1 (Kating/Rare) — 25% pool
(UUID(), 'Nopal Move On', 'Bucin', 1, 70, 'Coding Hati Baru', 'Target Hype! +20 ATK, -10 HP/turn.', 'Ambis', 'Mantan jadi bahan skripsi. Sakit sekaligus produktif.', 25, '/images/nopal.png'),
(UUID(), 'Prof. Deadline', 'Ambis', 1, 75, 'Kuis Dadakan', 'Burnout lawan 2 giliran.', 'Santuy', 'Tugasnya ada di silabus. Kamu yang tidak baca.', 25, '/images/prof.png'),
(UUID(), 'Zara Overthink', 'Bucin', 1, 65, 'Double Read', 'Ghosting lawan 1 giliran penuh.', 'Ambis', '17 draft pesan. Tidak ada yang terkirim.', 25, '/images/zara.png'),
(UUID(), 'Hendra Skripsi Abadi', 'Santuy', 1, 80, 'BAB 3 Forever', 'Mager lawan 2 giliran.', 'Bucin', 'Semester 14. Sudah damai dengan situasi.', 25, '/images/hendra.png'),

-- Stage 2 (Semester Akhir/Ultra Rare) — 5% pool
(UUID(), 'God Baydar', 'Santuy', 2, 120, 'Sabda Dewa Warkop', 'Ghosting lawan 2 giliran. Diri sendiri immune Burnout.', 'Bucin', 'Legenda warung kopi. Tidak ada tugas yang bertahan dari obrolannya.', 5, '/images/godbaydar.png'),
(UUID(), 'The Last SKS', 'Ambis', 2, 110, 'Final Boss Mode', 'Burnout semua lawan. Diri sendiri +30 ATK.', 'Santuy', 'IP 4.0. Tidak punya teman. Tidak butuh.', 5, '/images/lastsks.png'),
(UUID(), 'Bucin Sejati', 'Bucin', 2, 100, 'Infinite Devotion', 'Sacrifice 20 HP sendiri → lawan Ghosting 3 giliran.', 'Ambis', 'Rela tidak lulus demi menemani doi belajar.', 5, '/images/bucinsejati.png');
