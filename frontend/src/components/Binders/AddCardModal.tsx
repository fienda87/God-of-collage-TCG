import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useCollectionStore } from '../../store/collectionStore';
import { type CardData, ALL_CARDS } from '../../data/cards';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cardId: string) => void;
  loading?: boolean;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  loading = false,
}) => {
  const ownedCards = useCollectionStore((state) => state.cards);
  const [searchTerm, setSearchTerm] = useState('');

  // Group owned cards by cardId and count quantities
  const uniqueOwnedCards = React.useMemo(() => {
    const map = new Map<string, { card: CardData; count: number }>();
    ownedCards.forEach((c) => {
      const template = ALL_CARDS.find((ac) => ac.name === c.name);
      if (template) {
        if (map.has(template.id)) {
          map.get(template.id)!.count++;
        } else {
          map.set(template.id, { card: template, count: 1 });
        }
      }
    });
    return Array.from(map.values());
  }, [ownedCards]);

  const filteredCards = uniqueOwnedCards.filter((c) =>
    c.card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[80vh] flex flex-col bg-zinc-900 border-2 border-white rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-800 shrink-0">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-1 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-[800] text-white uppercase tracking-tight mb-4">
              PILIH KARTU
            </h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari kartu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white font-[800] focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            {filteredCards.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 font-[800] uppercase">Tidak ada kartu yang cocok</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCards.map(({ card, count }) => (
                  <button
                    key={card.id}
                    onClick={() => onSelect(card.id)}
                    disabled={loading}
                    className="relative aspect-[2.5/3.5] bg-zinc-950 rounded-lg shadow-md border-2 border-transparent hover:border-blue-500 hover:scale-105 transition-all overflow-hidden disabled:opacity-50 group"
                  >
                    <div 
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url('${card.image_url || card.imageUrl}')` }}
                    />
                    {/* Quantity Badge */}
                    <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-[800] px-2 py-1 rounded z-10">
                      x{count}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
