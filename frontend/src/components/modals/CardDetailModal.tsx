import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type CardData, RARITY_COLORS } from '../../data/cards';
import TiltedCard from '../ui/TiltedCard';

interface CardDetailModalProps {
  card: CardData;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  const rarityColor = RARITY_COLORS[card.rarity] || '#ffffff';

  const closeButton = (
    <button
      className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-[800] text-[24px] cursor-pointer border-none z-20 hover:bg-white hover:text-black transition-colors pointer-events-auto shadow-xl"
      style={{ boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px inset' }}
      onClick={onClose}
    >
      ×
    </button>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', perspective: 1200 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ y: 60, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 60, scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Responsive sizing: width-based on mobile, height-based on larger screens */}
          <div className="relative aspect-[2.5/3.5] w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none sm:h-[80vh] md:h-[85vh]">
            <TiltedCard
              imageSrc={card.image_url}
              altText={card.name}
              captionText={card.name}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={closeButton}
              imageStyle={{
                boxShadow: `${rarityColor} 0px 0px 0px 3px inset, 0 30px 60px rgba(0,0,0,0.7)`,
                backgroundColor: '#111'
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
