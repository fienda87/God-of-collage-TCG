import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_CARDS, RARITY_COLORS } from '../../data/cards';

interface BoosterInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  volume: number;
}

export const BoosterInfoModal: React.FC<BoosterInfoModalProps> = ({ isOpen, onClose, volume }) => {
  // Prevent body scroll when modal is open
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

  // Filter and group cards in the selected volume
  const groupedCards = useMemo(() => {
    const cards = ALL_CARDS.filter((c) => c.volume === volume);

    const groups: Record<string, typeof cards> = {
      'Special Mythical': [],
      'Exclusive Legendary': [],
      'Ultra Rare': [],
      'Super Rare': [],
      'Rare': [],
      'Common': [],
    };

    cards.forEach((card) => {
      if (groups[card.rarity]) {
        groups[card.rarity].push(card);
      } else {
        // Fallback for Event/Item cards or others that don't have standard rarities
        if (card.element === 'Event' || card.element === 'Item') {
          const key = card.rarity || 'Common';
          if (!groups[key]) groups[key] = [];
          groups[key].push(card);
        }
      }
    });

    return groups;
  }, [volume]);

  // Volume metadata
  const volumeName = useMemo(() => {
    switch (volume) {
      case 1:
        return 'VOL 1: MABA';
      case 2:
        return 'VOL 2: SEMESTER AKHIR';
      case 3:
        return 'VOL 3: NEW JOURNEY SKRIPSI';
      default:
        return `VOL ${volume}`;
    }
  }, [volume]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop (Fade-in/out) */}
        <motion.div
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          transition={{ duration: 0.2 }}
        />

        {/* Modal Window (Scale up from 0.95 with opacity, spring ease-out) */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[80vh] bg-[#0d0d0f] border border-[#d7b73b]/40 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_20px_rgba(215,183,59,0.1)] flex flex-col font-sans"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/10 bg-gradient-to-r from-[#d7b73b]/10 to-transparent">
            <div>
              <span className="text-[11px] font-[900] text-[#d7b73b] tracking-[0.2em] uppercase">INFORMASI GACHARATE & CARDLIST</span>
              <h3 className="text-xl md:text-2xl font-[900] text-white leading-tight mt-1">{volumeName}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              style={{ transition: 'all 150ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 scrollbar-thin">
            {/* 1. Gacha Rates Section */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5">
              <h4 className="text-[14px] font-[900] text-[#d7b73b] uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>📊</span> PERSENTASE PELUANG GACHA (RATES)
              </h4>

              <div className="space-y-4 text-sm text-white/80">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Normal Pull Rates */}
                  <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                    <span className="font-bold text-white block mb-2 text-xs text-white/50 uppercase">Slot 1 s/d 4 (Normal)</span>
                    <ul className="space-y-1 text-xs">
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span>⚪ Common</span>
                        <span className="font-bold text-white">70.0%</span>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[#3b82f6]">🔵 Rare</span>
                        <span className="font-bold text-white">20.0%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#a855f7]">🟣 Super Rare (SR)</span>
                        <span className="font-bold text-white">10.0%</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/30 border border-white/5 rounded-lg p-3">
                    <span className="font-bold text-white block mb-2 text-xs text-white/50 uppercase">Slot 5 (Maks. Mythical)</span>
                    <ul className="space-y-1 text-xs">
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span>⚪ Common</span>
                        <span className="font-bold text-white">70.0%</span>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[#3b82f6]">🔵 Rare</span>
                        <span className="font-bold text-white">18.0%</span>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[#a855f7]">🟣 Super Rare (SR)</span>
                        <span className="font-bold text-white">7.0%</span>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[#eab308]">🟡 Ultra Rare (UR)</span>
                        <span className="font-bold text-white">4.5%</span>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-[#ef4444]">🔴 Legendary (EX)</span>
                        <span className="font-bold text-white">0.4%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#ff6bcb]">💎 Special Mythical</span>
                        <span className="font-bold text-white">0.1%</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Pity Pull Rates */}
                <div className="bg-[#d7b73b]/10 border border-[#d7b73b]/20 rounded-lg p-3.5">
                  <span className="font-extrabold text-[#d7b73b] block mb-2 text-xs uppercase tracking-wide">
                    🎁 PITY METERS AKTIF (Setelah 20 Pulls Tanpa SR+)
                  </span>
                  <p className="text-xs text-white/60 mb-2 leading-relaxed">
                    Saat jaminan pity aktif (20/20), gacha berikutnya akan menjamin <strong>Slot 3, 4, dan 5</strong> sebagai kartu premium dengan persentase:
                  </p>
                  <ul className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-black/40 border border-white/5 rounded p-2">
                      <span className="block text-[#a855f7] font-bold">SR</span>
                      <span className="font-extrabold text-white text-sm">60%</span>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded p-2">
                      <span className="block text-[#eab308] font-bold">UR</span>
                      <span className="font-extrabold text-white text-sm">25%</span>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded p-2">
                      <span className="block text-[#ef4444] font-bold">Legendary</span>
                      <span className="font-extrabold text-white text-sm">10%</span>
                    </div>
                    <div className="bg-black/40 border border-[#ff6bcb]/30 rounded p-2">
                      <span className="block text-[#ff6bcb] font-bold">Mythical</span>
                      <span className="font-extrabold text-white text-sm">2.5%</span>
                    </div>
                  </ul>
                  <p className="text-[10px] text-white/40 mt-2 text-center">
                    * Slot 1 dan 2 tetap bergulir menggunakan rate normal.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Card List Section */}
            <div className="space-y-4">
              <h4 className="text-[14px] font-[900] text-[#d7b73b] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>🎴</span> KARTU YANG TERSEDIA DI PACK ({volumeName})
              </h4>

              <div className="space-y-5 text-sm">
                {Object.entries(groupedCards).map(([rarity, cards]) => {
                  if (cards.length === 0) return null;
                  const color = RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] || '#ffffff';

                  return (
                    <div key={rarity} className="border-l-2 pl-4 py-1" style={{ borderColor: color }}>
                      <span className="font-extrabold block text-xs tracking-wider uppercase mb-2" style={{ color: color }}>
                        {rarity} ({cards.length} Kartu)
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                        {cards.map((card) => (
                          <div
                            key={card.id}
                            className="text-xs flex items-center justify-between text-white/80 bg-white/5 px-2 py-1.5 rounded border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all"
                          >
                            <span className="font-semibold truncate pr-1">{card.name}</span>
                            <span className="text-[9px] font-bold uppercase shrink-0 text-white/40">
                              {card.element}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#08080a] border-t border-white/5 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-white text-black font-extrabold hover:bg-white/90 active:scale-[0.97] transition-all text-xs cursor-pointer"
              style={{ transition: 'all 120ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              Tutup Catatan
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
