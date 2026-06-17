import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CardDetailModal } from '../components/modals/CardDetailModal';
import { ALL_CARDS, type CardData, ELEMENT_COLORS, RARITY_COLORS } from '../data/cards';
import { useCollectionStore } from '../store/collectionStore';
import { DropdownNavigation } from '../components/ui/dropdown-navigation';
import { Layers, Flame, Coffee, Heart, Star, Package, Book, BookOpen, Circle, Triangle, Hexagon, Diamond, Crown } from 'lucide-react';

const ELEMENTS = ['Ambis', 'Santuy', 'Bucin', 'Event', 'Item'] as const;
const RARITIES = ['Common', 'Rare', 'Super Rare', 'Ultra Rare', 'Exclusive Legendary'] as const;


export const Collection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [filterElement, setFilterElement] = useState<string>('All');
  const [filterRarity, setFilterRarity] = useState<string>('All');
  const [filterVolume, setFilterVolume] = useState<number | 'All'>('All');
  const [viewMode, setViewMode] = useState<'koleksi' | 'galeri'>('koleksi');
  
  const ownedCards = useCollectionStore((state) => state.cards);

  const baseCards = useMemo(() => {
    if (viewMode === 'galeri') return ALL_CARDS;
    
    // Deduplicate owned cards based on ID
    const uniqueOwned = new Map<string, CardData>();
    ownedCards.forEach((c: CardData) => {
      if (!uniqueOwned.has(c.id)) {
        // Find the fresh card data from ALL_CARDS to ensure updated image_url
        // Match by name instead of id because generatePull randomizes the id
        const freshCard = ALL_CARDS.find(card => card.name === c.name);
        
        // We still use c.id to keep the unique instance id for React keys
        uniqueOwned.set(c.id, freshCard ? { ...freshCard, id: c.id } : c);
      }
    });
    return Array.from(uniqueOwned.values());
  }, [viewMode, ownedCards]);

  const filteredCards = baseCards.filter(c => {
    if (filterElement !== 'All' && c.element !== filterElement) return false;
    if (filterRarity !== 'All' && c.rarity !== filterRarity) return false;
    if (filterVolume !== 'All' && (c.volume || 1) !== filterVolume) return false;
    return true;
  });

  const NAV_ITEMS = [
    {
      id: 1,
      label: `Elemen: ${filterElement === 'All' ? 'Semua' : filterElement}`,
      subMenus: [
        {
          title: "Pilih Elemen",
          items: [
            { label: "Semua", description: "Tampilkan semua elemen", icon: Layers, onClick: () => setFilterElement('All'), isActive: filterElement === 'All' },
            { label: "Ambis", description: "Elemen akademisi", icon: Flame, onClick: () => setFilterElement('Ambis'), isActive: filterElement === 'Ambis' },
            { label: "Santuy", description: "Elemen rebahan", icon: Coffee, onClick: () => setFilterElement('Santuy'), isActive: filterElement === 'Santuy' },
            { label: "Bucin", description: "Elemen asmara", icon: Heart, onClick: () => setFilterElement('Bucin'), isActive: filterElement === 'Bucin' },
            { label: "Event", description: "Kartu peristiwa", icon: Star, onClick: () => setFilterElement('Event'), isActive: filterElement === 'Event' },
            { label: "Item", description: "Kartu perlengkapan", icon: Package, onClick: () => setFilterElement('Item'), isActive: filterElement === 'Item' },
          ]
        }
      ]
    },
    {
      id: 2,
      label: `Volume: ${filterVolume === 'All' ? 'Semua' : 'Vol ' + filterVolume}`,
      subMenus: [
        {
          title: "Pilih Volume",
          items: [
            { label: "Semua", description: "Semua kartu", icon: Layers, onClick: () => setFilterVolume('All'), isActive: filterVolume === 'All' },
            { label: "Vol 1", description: "Maba", icon: Book, onClick: () => setFilterVolume(1), isActive: filterVolume === 1 },
            { label: "Vol 2", description: "Semester Akhir", icon: BookOpen, onClick: () => setFilterVolume(2), isActive: filterVolume === 2 },
            { label: "Vol 3", description: "New Journey Skripsi", icon: BookOpen, onClick: () => setFilterVolume(3), isActive: filterVolume === 3 },
          ]
        }
      ]
    },
    {
      id: 3,
      label: `Rarity: ${filterRarity === 'All' ? 'Semua' : filterRarity}`,
      subMenus: [
        {
          title: "Pilih Kelangkaan",
          items: [
            { label: "Semua", description: "Semua tingkat", icon: Layers, onClick: () => setFilterRarity('All'), isActive: filterRarity === 'All' },
            { label: "Common", description: "IPK 1", icon: Circle, onClick: () => setFilterRarity('Common'), isActive: filterRarity === 'Common' },
            { label: "Rare", description: "IPK 2.5", icon: Triangle, onClick: () => setFilterRarity('Rare'), isActive: filterRarity === 'Rare' },
            { label: "Super Rare", description: "IPK 3.5", icon: Hexagon, onClick: () => setFilterRarity('Super Rare'), isActive: filterRarity === 'Super Rare' },
            { label: "Ultra Rare", description: "IPK 4", icon: Diamond, onClick: () => setFilterRarity('Ultra Rare'), isActive: filterRarity === 'Ultra Rare' },
            { label: "Ex. Legendary", description: "IPK 4 EX", icon: Crown, onClick: () => setFilterRarity('Exclusive Legendary'), isActive: filterRarity === 'Exclusive Legendary' },
          ]
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-12 pt-8 pb-20 overflow-x-hidden max-w-[1200px] mx-auto">
      {/* Title & Mode Toggle */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6">
        <div>
          <motion.h1
            className="text-[55px] md:text-[65px] text-white leading-[1] m-0 mb-2 font-[800]"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            CARD-DEX.
          </motion.h1>
          <p className="text-[16px] md:text-[20px] font-[800] text-white/60 m-0">
            {viewMode === 'koleksi' ? `Kamu memiliki ${baseCards.length} dari ${ALL_CARDS.length} kartu` : `${ALL_CARDS.length} kartu • ${RARITIES.length} tingkat rarity`}
          </p>
        </div>
        
        {/* Toggle View Mode */}
        <div className="flex mt-4 md:mt-0 bg-white/10 rounded-full p-1 border border-white/20 w-fit self-start md:self-auto">
          <button
            onClick={() => setViewMode('koleksi')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'koleksi' ? 'bg-[#d7b73b] text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            Koleksiku
          </button>
          <button
            onClick={() => setViewMode('galeri')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'galeri' ? 'bg-[#d7b73b] text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            Galeri (Semua)
          </button>
        </div>
      </div>

      {/* Dropdown Navigation Filters */}
      <div className="mb-8">
        <DropdownNavigation navItems={NAV_ITEMS} />
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

            <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 md:gap-6 p-4 md:p-8 bg-black/40 backdrop-blur-xl rounded-[20px] md:rounded-[32px] border border-white/10 shadow-2xl">
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
                      className="w-[100px] h-[140px] sm:w-[130px] sm:h-[182px] md:w-[160px] md:h-[224px] bg-white rounded-[10px] md:rounded-[13px] flex flex-col overflow-hidden"
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
                      <div className="p-1.5 md:p-2 bg-white border-t-2 border-black/10">
                        <p className="text-[8px] sm:text-[10px] md:text-[12px] text-black font-[800] m-0 leading-tight truncate">{card.name}</p>
                        <p className="text-[7px] sm:text-[8px] md:text-[10px] font-[800] m-0 mt-0.5" style={{ color: rarityColor }}>
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
