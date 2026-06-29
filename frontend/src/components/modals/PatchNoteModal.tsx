import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PatchNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatchNoteModal: React.FC<PatchNoteModalProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Load Inter Font */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
        `}} />

        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[85vh] bg-[#0a0a0a] border border-[#d7b73b]/50 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(215,183,59,0.15)] flex flex-col font-inter"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-gradient-to-r from-[#d7b73b]/10 to-transparent">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📢</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#d7b73b] tracking-tight">PATCH NOTES UPDATE v3.1</h2>
              </div>
              <p className="text-sm md:text-base font-semibold text-white/80 uppercase tracking-widest">New Journey Skripsi</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar text-white/80 space-y-8 bg-[#0f0f0f]">
            
            {/* Intro */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl text-[15px] leading-relaxed">
              <p>
                <strong>Selamat datang di Kawan TCG Vol 3: New Journey Skripsi!</strong> Update kali ini bertemakan akhir perjuangan mahasiswa di bangku kuliah—Skripsi. Kami menghadirkan total 32 kartu baru, 2 karakter baru, serta <strong className="text-[#ff6bcb]">2 kartu Tag Team SPECIAL MYTHICAL</strong> ultra-langka eksklusif Booster Pack Vol 3!
              </p>
            </div>

            {/* Section 0: Volume 3 Highlights */}
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#FF6F37] flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="bg-[#FF6F37]/20 p-2 rounded-lg">🔥</span> [HOT] VOLUME 3: NEW JOURNEY SKRIPSI
              </h3>
              
              <div className="pl-2 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <span>🎓</span> Perilisan 32 Kartu Baru & 2 Karakter Baru
                  </h4>
                  <p className="text-white/70 mb-3 text-[15px] leading-relaxed">
                    Petualangan skripsi dan sidang kelulusan dimulai dengan hadirnya 32 kartu baru! Kami juga merilis 2 karakter baru yang siap bertarung di tongkrongan:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-extrabold text-[#fe2f2f] text-lg block mb-1">📚 Brikal (Elemen Ambis)</span>
                      <span className="text-sm text-white/60">Mahasiswa ambisius yang berjuang keras menaklukkan dosen pembimbing dan urusan administrasi skripsi demi predikat kelulusan terbaik.</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <span className="font-extrabold text-[#d7b73b] text-lg block mb-1">😎 Rapli (Elemen Santuy)</span>
                      <span className="text-sm text-white/60">Mahasiswa yang sangat santai, menyeimbangkan tekanan tugas akhir dengan ketenangan pikiran yang luar biasa.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <span>📦</span> Booster Box & Booster Pack Vol 3 Baru
                  </h4>
                  <p className="text-white/70 text-[15px] leading-relaxed">
                    Visual booster baru berwarna oranye membara kini tersedia di Home Slider dan Gacha. Anda juga bisa membeli <strong>Booster Pack Vol 3</strong> secara langsung di Toko seharga <strong>100 IP Points</strong> untuk melakukan gacha instan tanpa memotong energi harian.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <span>✨</span> Efek 3D Spring Hover Tilt pada Kartu
                  </h4>
                  <p className="text-white/70 text-[15px] leading-relaxed">
                    Kartu hasil gacha yang telah dibuka kini merespons gerakan kursor mouse Anda! Dekatkan mouse ke kartu untuk melihat efek kemiringan 3D spring tilt dinamis dan zoom halus yang interaktif.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <span>⚡</span> Peningkatan Performa & Penanganan GPU Leak
                  </h4>
                  <p className="text-white/70 text-[15px] leading-relaxed">
                    Perpindahan antar halaman kembali ke Home sekarang jauh lebih mulus berkat optimalisasi galeri WebGL (dibatasi 12 kartu premium terbaik), penundaan inisialisasi selama 400ms untuk memberi ruang bagi transisi halaman, dan pembersihan memori GPU instan pada unmount.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 0.5: Special Mythical */}
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#ff6bcb] flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="bg-[#ff6bcb]/20 p-2 rounded-lg">💎</span> [NEW] TIER BARU: SPECIAL MYTHICAL
              </h3>
              
              <div className="pl-2 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <span>🏆</span> Tier Paling Langka — Di Atas Exclusive Legendary
                  </h4>
                  <p className="text-white/70 mb-3 text-[15px] leading-relaxed">
                    Kami memperkenalkan tier kartu <strong className="text-[#ff6bcb]">Special Mythical (IPK Cumlaude)</strong> sebagai tier tertinggi dan paling langka di game! Kartu ini bertipe <strong>Tag Team</strong> dengan HP 200 dan skill gabungan yang sangat kuat.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="bg-gradient-to-br from-[#ff6bcb]/10 to-purple-500/10 p-4 rounded-xl border border-[#ff6bcb]/30">
                      <span className="font-extrabold text-[#ff6bcb] text-lg block mb-1">🤝 Sagab & Mikel S.KOM</span>
                      <span className="text-xs text-white/40 block mb-1">Tag Team • Santuy • HP 200</span>
                      <span className="text-sm text-white/60">Duo legendaris S.Kom yang menyelesaikan deadline mutlak bersama dengan Coretan Suci Tomsamchong.</span>
                    </div>
                    <div className="bg-gradient-to-br from-[#ff6bcb]/10 to-purple-500/10 p-4 rounded-xl border border-[#ff6bcb]/30">
                      <span className="font-extrabold text-[#ff6bcb] text-lg block mb-1">🤝 Master x Slave S.KOM</span>
                      <span className="text-xs text-white/40 block mb-1">Tag Team • Bucin • HP 200</span>
                      <span className="text-sm text-white/60">Tuan dan budak yang saling melengkapi. PC dijual, nego tipis. Ghosting + Deadline Mutlak.</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ff6bcb]/10 border border-[#ff6bcb]/20 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-[#ff6bcb] flex items-center gap-2 mb-2 uppercase tracking-wide">
                    ⚠️ Syarat & Ketentuan
                  </h4>
                  <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                    <li><strong>Eksklusif Booster Pack Vol 3</strong> — hanya bisa didapatkan dari gacha Vol 3.</li>
                    <li><strong>Tidak bisa dibeli di Toko</strong> — murni dari gacha saja.</li>
                    <li><strong>Rate Normal:</strong> 0.1% (hanya di Slot 5).</li>
                    <li><strong>Rate Pity:</strong> 2.5% (saat pity 20/20 aktif, berlaku di Slot 3, 4, 5).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 1: Core System */}
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#d7b73b] flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="bg-[#d7b73b]/20 p-2 rounded-lg">🛠️</span> 1. PEMBARUAN SISTEM UTAMA (CORE SYSTEM)
              </h3>
              
              <div className="pl-2 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <span>🏃‍♂️</span> Implementasi Mekanik "Bolos" (Retreat Cost)
                  </h4>
                  <p className="text-white/70 mb-3 text-[15px] leading-relaxed">
                    Untuk meningkatkan mobilitas karakter di arena, mekanik Retreat resmi diperkenalkan dengan nama lokal <strong>"Bolos"</strong>.
                  </p>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-[14px]">
                    <p className="mb-3"><span className="text-[#d7b73b] font-semibold">Cara Kerja:</span> Pemain bisa menukar kartu aktif di depan dengan kartu kawan di <em>bench</em> sebelum menyerang.</p>
                    <p className="mb-3"><span className="text-[#d7b73b] font-semibold">Biaya (Bolos Cost):</span> Dibayar menggunakan kartu SKS yang sedang menempel pada kartu tersebut (kartu SKS yang dipakai akan dibuang ke <em>discard pile</em>). Biayanya bervariasi tergantung tingkatan Stage:</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                        <span className="font-medium text-white">Stage 0 (Maba)</span>
                        <span className="font-bold text-[#d7b73b]">1 SKS</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                        <span className="font-medium text-white">Stage 1 (Kating)</span>
                        <span className="font-bold text-[#d7b73b]">2 SKS</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center col-span-2">
                        <span className="font-medium text-white">Stage 2 (Semester Akhir)</span>
                        <span className="font-bold text-[#d7b73b]">3 SKS</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <span>👑</span> Mekanik "Bakat Bawaan" (Passive Abilities)
                  </h4>
                  <p className="text-white/70 text-[15px] leading-relaxed bg-black/40 border border-white/5 rounded-xl p-4">
                    Kartu dengan tingkat kelangkaan premium (<strong>Super Rare, Ultra Rare, dan Exclusive Legendary</strong>) kini dibekali dengan Bakat Bawaan. Ini adalah efek pasif permanen yang berjalan otomatis tanpa menggunakan cost SKS, dan beberapa di antaranya tetap aktif meskipun kartu berada di posisi <em>bench</em>.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Mechanics */}
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-red-400 flex items-center gap-3 border-b border-white/10 pb-3 mt-8">
                <span className="bg-red-500/20 p-2 rounded-lg">⚔️</span> 2. KEYWORD & MEKANIK BARU (VOL 2)
              </h3>
              <p className="text-white/60 mb-4 pl-2">Dua pilar mekanik baru di Vol 2 adalah Kontrol Formasi Agresif dan Risiko Tinggi (Tradeoff):</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h5 className="font-bold text-white mb-1">Forced Switch</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Memaksa kartu cadangan musuh di <em>bench</em> untuk maju menjadi kartu aktif di depan (Mengacaukan persiapan evolusi lawan).</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h5 className="font-bold text-white mb-1">Taunt</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Memaksa kartu aktif lawan untuk hanya fokus menyerang kartu yang memicu efek Taunt ini di giliran berikutnya.</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h5 className="font-bold text-white mb-1">Anti-Switch</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Mengunci total posisi kartu aktif lawan agar tidak bisa melakukan mekanik Bolos atau ditukar ke <em>bench</em>.</p>
                </div>
                <div className="bg-black/40 border border-red-500/20 p-4 rounded-xl">
                  <h5 className="font-bold text-red-400 mb-1">Self-Burnout Tradeoff</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Efek samping negatif instan berupa Forced Discard SKS atau pengurangan HP drastis sebagai penyeimbang serangan berdaya rusak masif.</p>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <h5 className="font-bold text-white mb-1">SKS Lock & Food Lock</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Efek sabotase untuk memblokir lawan agar tidak bisa memasang energi SKS baru atau menggunakan kartu Makanan (Consumable).</p>
                </div>
                <div className="bg-black/40 border border-blue-400/20 p-4 rounded-xl">
                  <h5 className="font-bold text-blue-400 mb-1">Anti-Sleep</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Kekebalan atau penyembuhan instan dari status kelumpuhan (Sleep) berkat asupan kafein kopi booster.</p>
                </div>
                <div className="bg-black/40 border border-[#d7b73b]/20 p-4 rounded-xl md:col-span-2">
                  <h5 className="font-bold text-[#d7b73b] mb-1">Choice Effect</h5>
                  <p className="text-sm text-white/60 leading-relaxed">Pemain diberikan opsi untuk memilih 1 dari 2 efek mekanik berbeda saat mengaktifkan skill.</p>
                </div>
              </div>
            </section>

            {/* Section 3: New Cards */}
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-purple-400 flex items-center gap-3 border-b border-white/10 pb-3 mt-8">
                <span className="bg-purple-500/20 p-2 rounded-lg">🃏</span> 3. REKAP KARTU KARAKTER BARU (VOL 2)
              </h3>
              
              <div className="pl-2 space-y-4">
                <p className="text-[15px] text-white/80 leading-relaxed mb-4">
                  Semua karakter di bawah ini hadir dengan <strong>Art Visual Baru</strong> dan <strong>Skill Baru</strong> yang sepenuhnya berbeda dari Vol 1:
                </p>
                
                <h4 className="text-lg font-bold text-white mb-3 bg-white/5 p-2 rounded-lg inline-block px-4">Kelompok Evolusi Khusus (Stage 0 - 2)</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="bg-[#d7b73b]/20 p-3 rounded-lg mt-1"><span className="text-xl">☕</span></div>
                    <div>
                      <h5 className="font-bold text-lg text-white mb-1">Kelompok Agif <span className="text-sm font-normal text-white/50">(Elemen: Santuy)</span></h5>
                      <p className="text-[15px] text-white/60 leading-relaxed">Fokus sebagai <em>Support</em> pengisi energi SKS cadangan dan Recycle SKS dari tumpukan buang.</p>
                      <p className="text-sm font-mono mt-2 text-[#d7b73b]">Agif Maba → Agif Asdos → Prof. Agif</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="bg-pink-500/20 p-3 rounded-lg mt-1"><span className="text-xl">💖</span></div>
                    <div>
                      <h5 className="font-bold text-lg text-white mb-1">Kelompok Aqil <span className="text-sm font-normal text-white/50">(Elemen: Bucin)</span></h5>
                      <p className="text-[15px] text-white/60 leading-relaxed">Fokus pada mekanik Anti-Sleep (Kafein Booster) dan pemberi status Immunity satu tim.</p>
                      <p className="text-sm font-mono mt-2 text-pink-400">Aqil Maba → Aqil Part-Timer → Agent Qil</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
 
            {/* Section 4: Binder Feature */}
            <section className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-blue-400 flex items-center gap-3 border-b border-white/10 pb-3 mt-8">
                <span className="bg-blue-500/20 p-2 rounded-lg">📘</span> 4. FITUR BARU: SHOWCASE BINDER (BETA)
              </h3>
              
              <div className="pl-2 space-y-4 text-[15px] leading-relaxed text-white/70">
                <p>
                  Kini hadir fitur **Showcase Binder** untuk memamerkan dan menyusun kartu-kartu favorit hasil gacha Anda!
                </p>
                <div className="bg-black/40 border border-white/5 rounded-xl p-5 space-y-3">
                  <p><span className="text-[#d7b73b] font-semibold">📁 Kustomisasi Binder:</span> Buat hingga maksimal <strong>5 Binder</strong> dengan nama kustom Anda sendiri dan pilih 1 dari 12 preset warna tema yang menarik.</p>
                  <p><span className="text-[#d7b73b] font-semibold">🃏 Slot Kartu (Max 24):</span> Isi binder Anda dengan hingga 24 kartu pilihan dari koleksi Anda. Anda bebas menyimpan jumlah berapapun (misal hanya 1 kartu saja).</p>
                  <p><span className="text-[#d7b73b] font-semibold">👆 Drag-and-Drop Reorder:</span> Geser dan atur ulang letak/posisi kartu di dalam binder secara visual.</p>
                  <p><span className="text-[#d7b73b] font-semibold">⚡ Desain Draf & Tombol Simpan:</span> Lakukan modifikasi sesuka hati, lalu tekan tombol **SIMPAN** (💾) untuk menulis perubahan secara permanen ke <em>localStorage</em> browser Anda.</p>
                  <p><span className="text-[#d7b73b] font-semibold">📱 Haptic Press di Mobile:</span> Khusus untuk pengguna HP, **tahan kartu selama 250ms** untuk mulai menyeretnya. Ini memastikan navigasi gulir (*scroll*) halaman tetap berjalan normal tanpa macet.</p>
                </div>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
