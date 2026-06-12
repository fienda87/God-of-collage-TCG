import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  cardData?: any;
  isCenter?: boolean;
  onFlipped?: (stage: number) => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({ cardData, isCenter = false, onFlipped }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (isFlipped || !cardData) return;
    setIsFlipped(true);
    if (onFlipped) {
      setTimeout(() => onFlipped(cardData.stage), 200); // Trigger mid-flip
    }
  };

  return (
    <div className="relative" style={{ width: isCenter ? 200 : 120, height: isCenter ? 280 : 168, perspective: 1000 }}>
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={handleFlip}
      >
        {/* Front (Card Back design) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[13px] bg-black border-2 border-[var(--color-card-white)] flex items-center justify-center overflow-hidden cursor-pointer" style={{ backfaceVisibility: 'hidden' }}>
           <img src="/images/back design.png" alt="Card Back" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = ''; e.currentTarget.style.backgroundColor = '#111'; }} />
        </div>

        {/* Back (Card Face design) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[13px] bg-white border-2 border-black flex flex-col p-4 overflow-hidden"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          {cardData && (
            <>
              <img src={cardData.image_url} alt={cardData.name} className="w-full h-[60%] object-cover border-2 border-black rounded-[8px] mb-2" onError={(e) => { e.currentTarget.src = ''; e.currentTarget.style.backgroundColor = '#ddd'; }} />
              <h3 className="text-[12px] md:text-[14px] text-black font-heavy leading-tight">{cardData.name}</h3>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
