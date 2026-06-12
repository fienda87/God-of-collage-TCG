import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CardDetailModal } from '../components/modals/CardDetailModal';
import { ALL_CARDS, type CardData, ELEMENT_COLORS, RARITY_COLORS } from '../data/cards';

const ELEMENTS = ['Ambis', 'Santuy', 'Bucin'] as const;
const RARITIES = ['Common', 'Rare', 'Super Rare', 'Ultra Rare', 'Exclusive Legendary'] as const;

export const Collection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [filterElement, setFilterElement] = useState<string>('All');
  const [filterRarity, setFilterRarity] = useState<string>('All');

  const filteredCards = ALL_CARDS.filter(c => {
    if (filterElement !== 'All' && c.element !== filterElement) return false;
    if (filterRarity !== 'All' && c.rarity !== filterRarity) return false;
    return true;
  });

  const elementFilters = ['All', ...ELEMENTS];
  const rarityFilters = ['All', ...RARITIES];

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-12 pt-8 pb-20 overflow-x-hidden max-w-[1200px] mx-auto">
      {/* Title */}
      <motion.h1
        className="text-[55px] md:text-[65px] text-white leading-[1] m-0 mb-4 font-[800]"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        CARD-DEX.
      </motion.h1>
      <p className="text-[20px] font-[800] text-white/60 m-0 mb-4">
        {ALL_CARDS.length} kartu • {RARITIES.length} tingkat rarity
      </p>

      {/* Element Filter Bar */}
      <div className="flex gap-3 mb-3 flex-wrap">
        {elementFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilterElement(f)}
            className="px-5 py-2 rounded-[38px] text-[14px] font-[800] cursor-pointer border-none transition-all duration-200"
            style={{
              backgroundColor: filterElement === f ? '#ffffff' : 'transparent',
              color: filterElement === f ? '#000000' : '#ffffff',
              boxShadow: filterElement === f
                ? 'rgb(0, 0, 0) 0px 0px 0px 2px inset'
                : 'rgb(255, 255, 255) 0px 0px 0px 2px inset',
            }}
          >
            {f === 'All' ? 'Semua' : f}
          </button>
        ))}
      </div>

      {/* Rarity Filter Bar */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {rarityFilters.map((f) => {
          const col = f !== 'All' ? RARITY_COLORS[f as CardData['rarity']] : '#ffffff';
          return (
            <button
              key={f}
              onClick={() => setFilterRarity(f)}
              className="px-4 py-1.5 rounded-[38px] text-[12px] font-[800] cursor-pointer border-none transition-all duration-200"
              style={{
                backgroundColor: filterRarity === f ? col : 'transparent',
                color: filterRarity === f ? (f === 'Common' ? '#000' : '#fff') : col,
                boxShadow: `${col} 0px 0px 0px 2px inset`,
              }}
            >
              {f === 'All' ? 'Semua Rarity' : f}
            </button>
          );
        })}
      </div>

      {/* Card sections by element */}
      {ELEMENTS.map(element => {
        const elementCards = filteredCards.filter(c => c.element === element);
        if (filterElement !== 'All' && filterElement !== element) return null;
        if (elementCards.length === 0) return null;

        return (
          <motion.section
            key={element}
            className="mb-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="border-b-2 border-white/30 pb-2 mb-6 flex justify-between items-end">
              <h2
                className="text-[40px] md:text-[55px] leading-[1] m-0 font-[800]"
                style={{ color: ELEMENT_COLORS[element] }}
              >
                {element.toUpperCase()}
              </h2>
              <span className="text-[20px] font-[800] text-white/60">
                {elementCards.length} kartu
              </span>
            </div>

            <div className="flex flex-wrap gap-4 justify-start">
              {elementCards.map((card, ci) => {
                const rot = ((card.name.charCodeAt(0) + card.name.length) % 7) - 3;
                const rarityColor = RARITY_COLORS[card.rarity];
                const hasAccent = card.rarity !== 'Common';

                return (
                  <motion.div
                    key={card.id}
                    className="relative cursor-pointer"
                    style={{ transform: `rotate(${rot}deg)` }}
                    whileHover={{ scale: 1.08, rotate: 0, zIndex: 100 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedCard(card)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    // @ts-ignore
                    transition2={{ delay: ci * 0.03 }}
                  >
                    <div
                      className="w-[130px] h-[182px] md:w-[160px] md:h-[224px] bg-white rounded-[13px] flex flex-col overflow-hidden"
                      style={{
                        boxShadow: hasAccent
                          ? `${rarityColor} 0px 0px 0px 3px inset`
                          : 'rgb(0, 0, 0) 0px 0px 0px 2px inset',
                      }}
                    >
                      <img
                        src={card.image_url}
                        alt={card.name}
                        className="w-full flex-1 object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.backgroundColor = '#eee'; }}
                      />
                      <div className="p-2 bg-white border-t-2 border-black/10">
                        <p className="text-[10px] md:text-[12px] text-black font-[800] m-0 leading-tight truncate">{card.name}</p>
                        <p className="text-[8px] md:text-[10px] font-[800] m-0 mt-0.5" style={{ color: rarityColor }}>
                          {card.rarityLabel}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        );
      })}

      {filteredCards.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[20px] text-white/40 font-[800]">Tidak ada kartu ditemukan.</p>
        </div>
      )}

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
};
