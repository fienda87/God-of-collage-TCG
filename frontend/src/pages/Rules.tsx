import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

const AccordionSection: React.FC<{ item: AccordionItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b-[2px] border-white/20">
      <button 
        className="w-full flex justify-between items-center py-6 px-2 cursor-pointer bg-transparent border-none text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[20px] md:text-[28px] font-[800] text-white leading-[1.3]">{item.title}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[28px] text-white font-[800] ml-4 flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-2 text-[16px] font-[400] text-white/80 leading-[2.38]">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqItems: AccordionItem[] = [
  {
    title: "Apa itu God of College?",
    content: (
      <p>God of College adalah game kartu koleksi (TCG) berbasis web yang terinspirasi dari kehidupan kampus. Kumpulkan kartu-kartu karakter kampus dengan membuka booster pack menggunakan sistem energi. Setiap karakter punya elemen, skill, dan lore-nya sendiri!</p>
    ),
  },
  {
    title: "Bagaimana cara mendapatkan kartu?",
    content: (
      <div>
        <p className="mb-4">Tekan tombol <strong>"BUKA PACK"</strong> di halaman utama. Setiap pack berisi 5 kartu acak.</p>
        <p>Setiap kali kamu membuka pack, kamu akan menggunakan 1 energi. Energi akan terisi ulang secara otomatis — 1 energi per jam, maksimal 2 energi.</p>
      </div>
    ),
  },
  {
    title: "Apa yang terjadi kalau dapat kartu duplikat?",
    content: (
      <p>Kartu duplikat akan menambah jumlah kepemilikan kartu tersebut. Kamu bisa lihat jumlah duplikat di halaman Koleksi. Jadi jangan khawatir, setiap pull tetap berharga!</p>
    ),
  },
  {
    title: "Berapa peluang mendapatkan kartu langka?",
    content: (
      <div>
        <p className="mb-2">Setiap slot di pack punya peluang berbeda:</p>
        <ul className="list-none p-0 m-0">
          <li className="mb-2">• <strong>Slot 1–3:</strong> 70% Stage 0 (Maba), 30% Stage 1 (Kating)</li>
          <li className="mb-2">• <strong>Slot 4:</strong> 75% Stage 0, 25% Stage 1</li>
          <li>• <strong>Slot 5 (Kartu Utama):</strong> 25% Stage 0, 70% Stage 1, <strong>5% Stage 2 (Ultra Rare!)</strong></li>
        </ul>
      </div>
    ),
  },
  {
    title: "Bagaimana sistem energi bekerja?",
    content: (
      <div>
        <ul className="list-none p-0 m-0">
          <li className="mb-2">• Energi maksimal: <strong>2</strong></li>
          <li className="mb-2">• Regenerasi: <strong>1 energi per jam</strong></li>
          <li className="mb-2">• Biaya buka pack: <strong>1 energi</strong></li>
          <li>• Akun baru dimulai dengan <strong>2 energi (penuh)</strong></li>
        </ul>
      </div>
    ),
  },
];

const statusEffects: AccordionItem[] = [
  {
    title: "🤢 Burnout",
    content: (
      <p><strong>+10 damage</strong> di akhir setiap giliran. Berlangsung <strong>2 giliran</strong> atau sampai di-heal. Kartu seperti Prof. Deadline bisa menyebabkan efek ini.</p>
    ),
  },
  {
    title: "🔥 Hype",
    content: (
      <p><strong>+20 ATK</strong>, tapi <strong>-10 HP sendiri per giliran</strong>. Berlangsung sampai HP = 0 atau kartu ditarik. Kartu seperti Nopal Move On mengaktifkan efek ini.</p>
    ),
  },
  {
    title: "👻 Ghosting",
    content: (
      <p>Lawan <strong>tidak bisa retreat secara manual</strong> selama <strong>1 giliran penuh lawan</strong>. Efek yang sangat kuat dari kartu-kartu Bucin!</p>
    ),
  },
  {
    title: "😴 Mager",
    content: (
      <p>Kartu sendiri <strong>tidak bisa retreat</strong> selama <strong>1 giliran</strong>. Efek khas dari kartu-kartu Santuy yang terlalu santai untuk bergerak.</p>
    ),
  },
];

export const Rules: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-12 pt-8 pb-20 max-w-[800px] mx-auto">
      <h1 className="text-[55px] md:text-[65px] text-white leading-[1] m-0 mb-4 font-[800]">ATURAN MAIN.</h1>
      <p className="text-[20px] font-[800] text-white/60 m-0 mb-12">Semua yang perlu kamu tahu.</p>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-[40px] font-[800] text-[#fe2f2f] leading-[1.07] m-0 mb-6">FAQ</h2>
        <div>
          {faqItems.map((item, i) => (
            <AccordionSection key={i} item={item} />
          ))}
        </div>
      </section>

      {/* Status Effects */}
      <section className="mb-16">
        <h2 className="text-[40px] font-[800] text-[#7333f1] leading-[1.07] m-0 mb-6">STATUS EFFECTS</h2>
        <div>
          {statusEffects.map((item, i) => (
            <AccordionSection key={i} item={item} />
          ))}
        </div>
      </section>

      {/* Element Weakness Table */}
      <section className="mb-16">
        <h2 className="text-[40px] font-[800] text-[#d7b73b] leading-[1.07] m-0 mb-6">ELEMENT WEAKNESS</h2>
        <div className="bg-white rounded-[13px] p-6 shadow-[rgb(0,0,0)_0px_0px_0px_2px_inset]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-3 text-[16px] font-[800] text-black">Element</th>
                <th className="text-left py-3 text-[16px] font-[800] text-black">Lemah Terhadap</th>
                <th className="text-left py-3 text-[16px] font-[800] text-black">Efek</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black/20">
                <td className="py-4 text-[16px] font-[800] text-[#fe2f2f]">Ambis 📚</td>
                <td className="py-4 text-[16px] font-[400] text-black">Santuy</td>
                <td className="py-4 text-[16px] font-[400] text-black">×2 damage dari Santuy</td>
              </tr>
              <tr className="border-b border-black/20">
                <td className="py-4 text-[16px] font-[800] text-[#d7b73b]">Santuy 😎</td>
                <td className="py-4 text-[16px] font-[400] text-black">Bucin</td>
                <td className="py-4 text-[16px] font-[400] text-black">×2 damage dari Bucin</td>
              </tr>
              <tr>
                <td className="py-4 text-[16px] font-[800] text-[#7333f1]">Bucin 💘</td>
                <td className="py-4 text-[16px] font-[400] text-black">Ambis</td>
                <td className="py-4 text-[16px] font-[400] text-black">×2 damage dari Ambis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Rarity Info */}
      <section className="mb-16">
        <h2 className="text-[40px] font-[800] text-white leading-[1.07] m-0 mb-6">RARITY / STAGE</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-[13px] p-5 shadow-[rgb(0,0,0)_0px_0px_0px_2px_inset]">
            <h3 className="text-[20px] font-[800] text-black m-0 mb-2">Stage 0 — Maba (Common)</h3>
            <p className="text-[14px] font-[400] text-black/70 m-0">Kartu mahasiswa baru. Mudah didapat, HP rendah, tapi jangan diremehkan!</p>
          </div>
          <div className="bg-white rounded-[13px] p-5 shadow-[rgb(0,0,0)_0px_0px_0px_2px_inset] border-2 border-[#1b5bff]">
            <h3 className="text-[20px] font-[800] text-black m-0 mb-2">Stage 1 — Kating (Rare) 💎</h3>
            <p className="text-[14px] font-[400] text-black/70 m-0">Kartu kakak tingkat. Skill lebih kuat, HP lebih tinggi. Blue aura saat reveal!</p>
          </div>
          <div className="bg-white rounded-[13px] p-5 shadow-[rgb(0,0,0)_0px_0px_0px_2px_inset] border-2 border-[#d7b73b]">
            <h3 className="text-[20px] font-[800] text-black m-0 mb-2">Stage 2 — Semester Akhir (Ultra Rare) ⭐</h3>
            <p className="text-[14px] font-[400] text-black/70 m-0">Legenda kampus. Skill devastating, HP tertinggi. Gold aura + holographic shimmer!</p>
          </div>
        </div>
      </section>
    </div>
  );
};
