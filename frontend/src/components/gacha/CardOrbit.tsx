import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FlipCard } from './FlipCard';
import { RarityAura } from './RarityAura';

interface CardOrbitProps {
  cards: any[];
  onAllFlipped: () => void;
}

export const CardOrbit: React.FC<CardOrbitProps> = ({ cards, onAllFlipped }) => {
  const [flippedCount, setFlippedCount] = useState(0);
  const [activeAura, setActiveAura] = useState<{ id: string, stage: number, play?: () => void } | null>(null);

  const handleCardFlipped = (id: string, stage: number, card: any) => {
    setFlippedCount(prev => prev + 1);
    if (stage > 0) {
      if (card.rarity !== 'Common' && activeAura) {
        activeAura.play?.();
      }
      setActiveAura({ id, stage });
      setTimeout(() => setActiveAura(null), 1500); // clear aura effect after 1.5s
    }
  };

  useEffect(() => {
    if (flippedCount === 5) {
      setTimeout(onAllFlipped, 1000);
    }
  }, [flippedCount, onAllFlipped]);

  // Radius for orbit
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 180;

  const getOrbitPosition = (index: number) => {
    const angle = (index / 4) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="relative w-full h-[60vh] flex items-center justify-center">
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {cards.map((card, index) => {
          const isCenter = index === 4;
          const position = isCenter ? { x: 0, y: 0 } : getOrbitPosition(index);
          
          return (
            <motion.div
              key={card.id || index}
              className="absolute"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              animate={{ x: position.x, y: position.y, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              style={{
                zIndex: isCenter ? 10 : 1
              }}
            >
              {/* Rarity Aura wrapper */}
              <div className="relative flex items-center justify-center">
                {activeAura?.id === card.id && (
                  <div className="absolute inset-[-40px] pointer-events-none z-0">
                    <RarityAura stage={activeAura.stage} />
                  </div>
                )}
                <div className="z-10 relative">
                  <FlipCard 
                    cardData={card} 
                    isCenter={isCenter} 
                    onFlipped={(stage) => handleCardFlipped(card.id, stage)} 
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
