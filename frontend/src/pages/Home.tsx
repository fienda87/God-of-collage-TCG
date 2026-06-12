import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useEnergyStore } from '../store/energyStore';
import CircularGallery from '../components/ui/CircularGallery';
import { ALL_CARDS } from '../data/cards';
import ScrollVelocity from '../components/ui/ScrollVelocity';
import ShinyText from '../components/ui/ShinyText';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { canOpenGacha, getSecondsUntilNextGacha, gachaCount } = useEnergyStore();
  
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilNextGacha());
  const canOpen = canOpenGacha();

  useEffect(() => {
    // If we have max tokens, we don't need a timer
    if (gachaCount >= 2) return;
    
    const interval = setInterval(() => {
      const remaining = getSecondsUntilNextGacha();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gachaCount, getSecondsUntilNextGacha]);

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Prepare cards for the gallery
  const galleryItems = useMemo(() => {
    return ALL_CARDS.map(card => ({
      image: card.image_url,
      text: "???"
    }));
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 relative">
      {/* Background Scrolling Text */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex flex-col justify-center gap-10 md:gap-20">
        <ScrollVelocity
          texts={['GACHA NOW', 'GOD OF COLLEGE']} 
          velocity={50}
          className="custom-scroll-text"
          numCopies={8}
          damping={50}
          stiffness={400}
        />
      </div>

      <div className="flex flex-col items-center max-w-[480px] mx-auto pt-10 px-4 relative z-10 flex-1">
        {/* Hero */}
        <motion.h1 
          className="text-[36px] sm:text-[45px] md:text-[65px] leading-[0.98] text-center text-white m-0 font-[800] tracking-tight mt-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <ShinyText
            text="GOD OF COLLEGE"
            speed={2}
            delay={0}
            color="#ffffff"
            shineColor="#d7b73b"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </motion.h1>
        <motion.h2
          className="text-[14px] sm:text-[16px] md:text-[20px] font-[800] text-[#d7b73b] tracking-[0.2em] mt-2 mb-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          TRADING CARD GAME
        </motion.h2>
        <motion.p 
          className="text-[16px] sm:text-[18px] font-[800] text-white/60 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          GET 'EM ALL
        </motion.p>
        
        {/* Booster Box */}
        <motion.div
          className={`relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] mb-8 ${canOpen ? 'cursor-pointer' : 'opacity-50 grayscale cursor-not-allowed'}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: canOpen ? 1 : 0.5, y: canOpen ? [0, -10, 0] : 0 }}
          whileHover={canOpen ? { scale: 1.05, rotate: 2 } : {}}
          whileTap={canOpen ? { scale: 0.95 } : {}}
          onClick={() => canOpen && navigate('/gacha')}
          transition={{ 
            scale: { delay: 0.3, type: 'spring' },
            opacity: { delay: 0.3 },
            y: canOpen ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : {}
          }}
        >
          <div className="absolute inset-0 bg-[#d7b73b] opacity-20 blur-3xl rounded-full" />
          
          {/* Box Image */}
          <img 
            src="/images/booster box.webp" 
            alt="Booster Box" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          />
          
          {/* Status Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
            {!canOpen && (
              <div className="bg-black/80 text-white font-bold px-4 py-2 rounded-lg text-center shadow-lg border border-[#d7b73b]">
                <div className="text-sm text-[#d7b73b] mb-1">Cooldown</div>
                <div className="text-xl">{formatTime(timeLeft)}</div>
              </div>
            )}
          </div>

          {/* Tokens Badge */}
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm border border-[#d7b73b] px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#d7b73b] animate-pulse" />
            <span className="text-[#d7b73b] font-bold">{gachaCount} / 2 Tiket</span>
          </div>
        </motion.div>
        
        {/* Actions */}
        <motion.div 
          className="w-full flex flex-col gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            fullWidth 
            className="py-[16px] text-[24px] shadow-[0_0_20px_rgba(215,183,59,0.3)]"
            onClick={() => navigate('/gacha')}
            disabled={!canOpen}
          >
            {canOpen ? `BUKA PACK (${gachaCount} TERSISA)` : `TUNGGU ${formatTime(timeLeft)}`}
          </Button>
          
          <div className="flex w-full gap-4 mt-2">
            <Button variant="outline" fullWidth onClick={() => navigate('/collection')}>Koleksi Ku</Button>
            <Button variant="outline" fullWidth onClick={() => navigate('/rules')}>Aturan Main</Button>
          </div>
        </motion.div>

      </div>

      {/* Circular Gallery Section */}
      <motion.div 
        className="w-full h-[400px] md:h-[500px] mt-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <CircularGallery
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
          font="bold 24px Orbitron"
          scrollSpeed={2}
          items={galleryItems}
          mysteryMode={true}
        />
      </motion.div>
    </div>
  );
};
