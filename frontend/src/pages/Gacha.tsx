import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useEnergyStore } from '../store/energyStore';
import { generatePull, type CardData, RARITY_COLORS } from '../data/cards';
import { CardDetailModal } from '../components/modals/CardDetailModal';

// ─── RarityAura — Particle burst + glow ───
const RarityAura: React.FC<{ rarity: CardData['rarity'] }> = ({ rarity }) => {
  const color = RARITY_COLORS[rarity];
  const isLegendary = rarity === 'Exclusive Legendary';
  const isUltra = rarity === 'Ultra Rare';
  const count = isLegendary ? 28 : isUltra ? 22 : rarity === 'Super Rare' ? 18 : 14;

  return (
    <div className="absolute inset-[-40px] pointer-events-none flex items-center justify-center">
      <motion.div
        className="absolute w-full h-full rounded-[20px]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.9, 0.3], scale: [0.6, 1.2, 1.4] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ boxShadow: `0 0 60px 20px ${color}` }}
      />
      {isLegendary && (
        <motion.div
          className="absolute w-full h-full rounded-[20px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.6, 2.0] }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          style={{ boxShadow: `0 0 80px 30px ${color}` }}
        />
      )}
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 2 * Math.PI;
        const dist = 60 + Math.random() * 80;
        const size = 4 + Math.random() * 4;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ backgroundColor: color, width: size, height: size }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * dist + (Math.random() * 40 - 20),
              y: Math.sin(angle) * dist + (Math.random() * 40 - 20) - (isLegendary ? 30 : 0),
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.8 + Math.random() * 0.5, ease: "easeOut", delay: Math.random() * 0.15 }}
          />
        );
      })}
      {(isUltra || isLegendary) && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`rise-${i}`}
          className="absolute w-[3px] h-[3px] rounded-full"
          style={{ backgroundColor: color }}
          initial={{ x: (Math.random() - 0.5) * 100, y: 20, opacity: 1 }}
          animate={{ y: -120 - Math.random() * 60, opacity: 0 }}
          transition={{ duration: 1.5 + Math.random(), delay: 0.3 + Math.random() * 0.3, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// ─── FlipCard ───
const FlipCard: React.FC<{
  card: CardData;
  index: number;
  onFlipped?: () => void;
  onCardClick?: () => void;
  isMobile: boolean;
}> = ({ card, index, onFlipped, onCardClick, isMobile }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAura, setShowAura] = useState(false);

  const handleInteraction = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      if (card.rarity !== 'Common') {
        setTimeout(() => setShowAura(true), 200);
        setTimeout(() => setShowAura(false), 1800);
      }
      if (onFlipped) setTimeout(onFlipped, 400);
    } else {
      if (onCardClick) onCardClick();
    }
  };

  // responsive sizing
  const w = isMobile ? 130 : 200;
  const h = isMobile ? 182 : 280;
  const rarityColor = RARITY_COLORS[card.rarity];

  return (
    <div className="relative flex items-center justify-center">
      {showAura && <RarityAura rarity={card.rarity} />}
      <div 
        style={{ width: w, height: h, perspective: 1200 }} 
        className="cursor-pointer relative z-10" 
        onClick={handleInteraction}
      >
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          whileHover={!isFlipped ? { scale: 1.05 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card Back */}
          <div
            className="absolute inset-0 rounded-[13px] overflow-hidden"
            style={{ backfaceVisibility: 'hidden', boxShadow: '#ffffff 0px 0px 0px 2px inset' }}
          >
            <img src="/images/back design.png" alt="Card Back" className="w-full h-full object-cover" />
            <motion.div
              className="absolute inset-0 bg-white/5"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
            />
          </div>
          {/* Card Front */}
          <div
            className="absolute inset-0 rounded-[13px] bg-white overflow-hidden flex flex-col"
            style={{ 
              transform: 'rotateY(180deg)', 
              backfaceVisibility: 'hidden', 
              boxShadow: card.rarity !== 'Common' 
                ? `${rarityColor} 0px 0px 0px 4px inset` 
                : '#000000 0px 0px 0px 2px inset',
            }}
          >
            <img
              src={card.image_url}
              alt={card.name}
              className="w-full flex-1 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.backgroundColor = '#ddd'; }}
            />
            <div className="p-1.5 md:p-2 bg-white">
              <p className="text-[12px] md:text-[14px] text-black font-[800] m-0 leading-tight truncate">{card.name}</p>
              {card.rarity !== 'Common' && (
                <p className="text-[10px] md:text-[11px] font-[800] m-0 mt-0.5" style={{ color: rarityColor }}>{card.rarityLabel}</p>
              )}
            </div>
            {(card.rarity === 'Ultra Rare' || card.rarity === 'Exclusive Legendary') && (
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                  background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Interactive Pack ───
const InteractivePack: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const [isTearing, setIsTearing] = useState(false);

  const handleDragEnd = (_: any, info: any) => {
    // Kurangi threshold agar lebih sensitif dan mudah ditarik
    if (info.offset.x > 60) {
      setIsTearing(true);
      // Reduce the delay so cards burst out quicker
      setTimeout(onOpen, 350); 
    }
  };

  return (
    <motion.div
      initial={{ y: -200, opacity: 0, rotate: -5, x: '-50%' }}
      animate={{ y: '-50%', opacity: 1, rotate: 0, x: '-50%' }}
      exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
      transition={{ type: 'spring', damping: 15 }}
      className="absolute top-1/2 left-1/2 w-[220px] h-[330px] sm:w-[280px] sm:h-[420px] md:w-[320px] md:h-[480px] drop-shadow-2xl z-20"
    >
      {/* Glow Behind */}
      <motion.div 
        className="absolute inset-0 bg-[#d7b73b] opacity-30 blur-3xl rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom part (static) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: 'polygon(0 19.5%, 100% 19.5%, 100% 100%, 0 100%)' }}
      >
        <img 
          src="/images/booster pack.png" 
          alt="Booster Pack Bottom" 
          className="w-full h-full object-contain filter drop-shadow-md pointer-events-none" 
        />
      </div>

      {/* Top part (draggable) */}
      <motion.div
        className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0 25%)' }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 300 }}
        dragSnapToOrigin={!isTearing}
        onDragEnd={handleDragEnd}
        animate={isTearing ? { x: 300, y: 50, opacity: 0, rotate: 45 } : {}}
        transition={isTearing ? { duration: 0.5, ease: "easeIn" } : undefined}
        whileHover={!isTearing ? { scale: 1.02 } : {}}
      >
        <img 
          src="/images/booster pack.png" 
          alt="Booster Pack Top" 
          className="w-full h-full object-contain filter drop-shadow-md" 
        />
        {/* Tear line indicator */}
        <motion.div 
          className="absolute top-[24%] left-0 w-[40%] h-[4px] rounded-r-full bg-white shadow-[0_0_10px_white]"
          animate={{ opacity: [0.3, 1, 0.3], width: ['10%', '60%', '10%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Instructions */}
      <motion.div 
        className="absolute top-[5%] -right-10 pointer-events-none z-30"
        animate={{ x: [0, 10, 0], opacity: isTearing ? 0 : 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2">
          <span className="text-white font-[800] text-[12px] md:text-[14px]">GESER UNTUK BUKA</span>
          <span>👉</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Gacha: React.FC = () => {
  const [phase, setPhase] = useState<'pack' | 'reveal' | 'orbit' | 'done'>('pack');
  const [pulledCards, setPulledCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [flippedCount, setFlippedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const consumeGacha = useEnergyStore((s) => s.consumeGacha);
  const canOpen = useEnergyStore((s) => s.canOpenGacha());

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // If they can't open it and they're in the 'pack' phase, kick them out or disable interactions
    if (!canOpen && phase === 'pack') {
      navigate('/');
    }
  }, [canOpen, phase, navigate]);

  const handlePackOpen = useCallback(() => {
    const cards = generatePull();
    setPulledCards(cards);
    consumeGacha();
    
    // Save to collection
    import('../store/collectionStore').then(({ useCollectionStore }) => {
      const existingCards = useCollectionStore.getState().cards;
      useCollectionStore.getState().setCards([...existingCards, ...cards]);
    });
    
    setPhase('reveal');
  }, [consumeGacha]);

  const handleCardFlip = useCallback(() => {
    const newCount = flippedCount + 1;
    setFlippedCount(newCount);
    if (newCount >= pulledCards.length) {
      setTimeout(() => setPhase('done'), 1500);
    }
  }, [flippedCount, pulledCards.length]);

  const handleReset = useCallback(() => {
    setPhase('pack');
    setPulledCards([]);
    setFlippedCount(0);
    setSelectedCard(null);
  }, []);

  // Fan layout calculation
  const getFanPos = (i: number) => {
    // map 0,1,2,3,4 to -2, -1, 0, 1, 2
    const pos = i - 2; 
    if (isMobile) {
      // Tighter fan with overlap for mobile
      return { 
        x: pos * 50, 
        y: Math.abs(pos) * 15, 
        rotate: pos * 8,
        zIndex: i === 2 ? 10 : 5 - Math.abs(pos)
      };
    } else {
      // Spread out horizontal row for desktop
      return { 
        x: pos * 220, 
        y: Math.abs(pos) * 20, 
        rotate: pos * 4,
        zIndex: 5 - Math.abs(pos)
      };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden relative">
      {/* ─── Pack Phase ─── */}
      <AnimatePresence>
        {phase === 'pack' && (
          <InteractivePack key="pack" onOpen={handlePackOpen} />
        )}
      </AnimatePresence>

      {/* ─── Reveal & Fan Phase ─── */}
      {(phase === 'reveal' || phase === 'orbit' || phase === 'done') && pulledCards.length > 0 && (
        <div
          className="relative flex items-center justify-center w-full max-w-[1200px]"
          style={{ height: isMobile ? 400 : 500 }}
        >
          {pulledCards.map((card, i) => {
            const pos = getFanPos(i);

            return (
              <motion.div
                key={card.id + '-' + i}
                className="absolute left-1/2 top-1/2"
                style={{
                  marginLeft: isMobile ? -65 : -100, // half of width
                  marginTop: isMobile ? -91 : -140, // half of height
                  zIndex: pos.zIndex,
                }}
                initial={{ x: 0, y: -400, opacity: 0, scale: 0, rotate: Math.random() * 60 - 30 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  opacity: 1,
                  scale: 1,
                  rotate: pos.rotate,
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.3,
                  type: 'spring',
                  damping: 14,
                  stiffness: 110,
                }}
                onAnimationComplete={() => {
                  if (i === pulledCards.length - 1 && phase === 'reveal') {
                    setPhase('orbit');
                  }
                }}
              >
                {/* Slow hover breathing for waiting cards */}
                <motion.div
                  animate={phase === 'orbit' ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FlipCard
                    card={card}
                    index={i}
                    onFlipped={handleCardFlip}
                    onCardClick={() => setSelectedCard(card)}
                    isMobile={isMobile}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─── Instruction text ─── */}
      <AnimatePresence>
        {phase === 'orbit' && (
          <motion.p
            className="absolute bottom-16 text-[14px] font-[800] text-white/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap kartu untuk flip!
          </motion.p>
        )}
      </AnimatePresence>

      {/* ─── Done Phase ─── */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            className="absolute bottom-6 z-50 flex flex-col items-center gap-4"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <div className="flex gap-2 mb-2">
              {pulledCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: RARITY_COLORS[card.rarity] }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/collection')}>
                Koleksi Ku
              </Button>
              <Button onClick={handleReset}>
                Buka Lagi
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Card Detail Modal ─── */}
      {selectedCard && (
        <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
};
