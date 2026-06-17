import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGGER = 0.025;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative inline-block overflow-hidden ${className || ''}`}
      style={{
        lineHeight: 1.1,
        verticalAlign: 'middle'
      }}
    >
      <span className="block">
        {Array.from(children).map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </span>
      <span className="absolute inset-0 block">
        {Array.from(children).map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
};

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

const AccordionSection: React.FC<{ item: AccordionItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b-[2px] border-white/20">
      <motion.button 
        whileHover="hovered"
        className="w-full flex justify-between items-center py-6 px-2 cursor-pointer bg-transparent border-none text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[20px] md:text-[28px] font-[800] text-white leading-[1.3] overflow-hidden">
          <TextRoll>{item.title}</TextRoll>
        </span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[28px] text-white font-[800] ml-4 flex-shrink-0"
        >
          +
        </motion.span>
      </motion.button>
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
        <p className="mb-2">Setiap kartu yang kamu dapatkan memiliki peluang kelangkaan sebagai berikut:</p>
        <ul className="list-none p-0 m-0">
          <li className="mb-2">• ⚪ <strong>Common (Biasa):</strong> 60%</li>
          <li className="mb-2">• 🔵 <strong>Rare (Langka):</strong> 25%</li>
          <li className="mb-2">• 🟣 <strong>Super Rare (SR):</strong> 10%</li>
          <li className="mb-2">• 🟡 <strong>Ultra Rare (UR):</strong> 4.5%</li>
          <li>• 🔴 <strong>Exclusive Legendary:</strong> 0.5%</li>
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
  {
    title: "Mekanik Bolos (Retreat Cost)",
    content: (
      <div>
        <p className="mb-2">Sistem penukaran kartu aktif di depan dengan kartu kawan di <em>bench</em>. Biayanya dibayar dengan membuang kartu SKS yang menempel:</p>
        <ul className="list-none p-0 m-0">
          <li className="mb-2">• <strong>Stage 0 (Maba):</strong> Cost 1 SKS</li>
          <li className="mb-2">• <strong>Stage 1 (Kating):</strong> Cost 2 SKS</li>
          <li>• <strong>Stage 2 (Sem. Akhir):</strong> Cost 3 SKS</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Bakat Bawaan (Passive Abilities)",
    content: (
      <p>Efek pasif permanen khusus untuk kartu tingkat kelangkaan premium (Super Rare, Ultra Rare, Exclusive Legendary). Berjalan otomatis tanpa <em>cost</em> SKS, dan banyak yang tetap aktif meski kartu di <em>bench</em>.</p>
    ),
  },
  {
    title: "Bagaimana sistem Pity Gacha bekerja?",
    content: (
      <div>
        <p className="mb-2">Sistem Pity (Jaminan) membantu kamu mendapatkan kartu langka jika kurang beruntung:</p>
        <ul className="list-none p-0 m-0">
          <li className="mb-2">• Setiap kali kamu membuka booster pack tanpa mendapatkan kartu <strong>Super Rare (SR), Ultra Rare (UR), atau Exclusive Legendary</strong>, pity meter kamu akan bertambah <strong>+1</strong>.</li>
          <li className="mb-2">• Jika pity meter mencapai <strong>20/20</strong>, maka di pembukaan pack berikutnya (gacha ke-21), Slot ke-3, ke-4, dan ke-5 kartu dijamin 100% adalah kartu tingkat tinggi dengan peluang masing-masing: <strong>SR (55%), UR (35%), atau Exclusive Legendary (10%)</strong>.</li>
          <li>• Jika kamu mendapatkan kartu SR, UR, atau Exclusive Legendary secara alami di tengah jalan sebelum mencapai 20 pulls, pity meter akan <strong>langsung kembali ke 0</strong>.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Apa itu IP Points dan Shop?",
    content: (
      <div>
        <p className="mb-2"><strong>IP Points (Indeks Prestasi Points)</strong> adalah mata uang khusus yang diperoleh dari mendaur ulang kartu duplikat:</p>
        <ul className="list-none p-0 m-0 mb-4">
          <li className="mb-2">• ⚪ <strong>Common Duplicate:</strong> +1 IP Point</li>
          <li className="mb-2">• 🔵 <strong>Rare Duplicate:</strong> +5 IP Points</li>
          <li className="mb-2">• 🟣 <strong>Super Rare (SR) Duplicate:</strong> +15 IP Points</li>
          <li className="mb-2">• 🟡 <strong>Ultra Rare (UR) Duplicate:</strong> +50 IP Points</li>
          <li>• 🔴 <strong>Exclusive Legendary Duplicate:</strong> +200 IP Points</li>
        </ul>
        <p>Gunakan IP Points di halaman <strong>Shop</strong> untuk membeli kartu langka secara langsung, atau membeli <strong>Booster Pack Vol 1 & Vol 2</strong>.</p>
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
  {
    title: "💤 Sleep / Kelumpuhan",
    content: (
      <p>Kartu yang terkena efek Sleep <strong>tidak bisa menyerang atau menggunakan skill</strong> selama 1 giliran. Bisa disembuhkan secara instan dengan mekanik Anti-Sleep (Kafein Booster).</p>
    ),
  },
  {
    title: "🔒 SKS Lock & Food Lock",
    content: (
      <p>Efek sabotase yang memblokir birokrasi lawan sehingga mereka <strong>tidak bisa memasang energi SKS baru</strong> atau menggunakan kartu item Makanan pada giliran berikutnya.</p>
    ),
  },
  {
    title: "🛡️ Immunity & Anti-Sleep",
    content: (
      <p>Status penetral taktis yang memberikan <strong>kekebalan penuh</strong> terhadap efek negatif seperti Sleep. Sering dimiliki oleh karakter bertema Santuy atau Bucin.</p>
    ),
  },
  {
    title: "💥 Self-Burnout Tradeoff",
    content: (
      <p>Serangan nuklir dengan daya rusak sangat masif yang diikuti dengan <strong>efek samping instan</strong> (seperti pengurangan HP drastis atau Forced Discard ke diri sendiri).</p>
    ),
  },
  {
    title: "🎯 Taunt",
    content: (
      <p>Memaksa musuh aktif hanya <strong>fokus menyerang kartu dengan efek ini</strong> di giliran berikutnya.</p>
    ),
  },
  {
    title: "🔄 Forced Switch",
    content: (
      <p>Menyeret kartu <em>bench</em> lawan untuk <strong>maju secara paksa ke depan</strong> menggantikan kartu aktif mereka.</p>
    ),
  },
  {
    title: "⛓️ Anti-Switch",
    content: (
      <p>Mengunci total kartu musuh agar <strong>tidak bisa melakukan mekanik Bolos/Retreat</strong>.</p>
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
