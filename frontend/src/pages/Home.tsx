import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useEnergyStore, MAX_GACHA } from '../store/energyStore';
import CircularGallery from '../components/ui/CircularGallery';
import { ALL_CARDS } from '../data/cards';
import ScrollVelocity from '../components/ui/ScrollVelocity';
import ShinyText from '../components/ui/ShinyText';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '../components/ui/announcement';
import { ArrowUpRightIcon, Bell, Info } from 'lucide-react';
import { PatchNoteModal } from '../components/modals/PatchNoteModal';
import { BoosterInfoModal } from '../components/modals/BoosterInfoModal';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { canOpenGacha, getSecondsUntilNextGacha, gachaCount, pityCountVol1, pityCountVol2, pityCountVol3 } = useEnergyStore();
  
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilNextGacha());
  const canOpen = canOpenGacha();
  const [selectedVolume, setSelectedVolume] = useState<number>(3);
  const [isPatchNoteOpen, setIsPatchNoteOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const currentPity = selectedVolume === 3 ? pityCountVol3 : selectedVolume === 2 ? pityCountVol2 : pityCountVol1;

  useEffect(() => {
    // If we have max tokens, we don't need a timer
    if (gachaCount >= MAX_GACHA) return;
    
    const interval = setInterval(() => {
      const remaining = getSecondsUntilNextGacha();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        useEnergyStore.getState().checkRefill();
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

  // Prepare cards for the gallery (limit to 12 items to prevent WebGL initialization lag)
  const galleryItems = useMemo(() => {
    // Select 12 representative cards across volumes, prioritizing premium rarities
    const selected: typeof ALL_CARDS = [];
    const seenImages = new Set<string>();

    const premiumCards = ALL_CARDS.filter(
      (c) => c.rarity === 'Exclusive Legendary' || c.rarity === 'Ultra Rare' || c.rarity === 'Super Rare'
    );

    for (const card of premiumCards) {
      if (selected.length >= 12) break;
      if (!seenImages.has(card.image_url)) {
        seenImages.add(card.image_url);
        selected.push(card);
      }
    }

    if (selected.length < 12) {
      for (const card of ALL_CARDS) {
        if (selected.length >= 12) break;
        if (!seenImages.has(card.image_url)) {
          seenImages.add(card.image_url);
          selected.push(card);
        }
      }
    }

    return selected.map((card) => ({
      image: card.image_url,
      text: '???'
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
        
        {/* Booster Box Slider */}
        <div className="relative flex items-center justify-center w-full mb-8">
          {/* Left Arrow */}
          <button 
            onClick={() => setSelectedVolume(prev => prev === 1 ? 3 : prev - 1)}
            className="absolute left-0 z-30 p-2 bg-black/50 hover:bg-black/80 rounded-full text-[#d7b73b] border border-[#d7b73b] transition-all"
            aria-label="Previous Box"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <motion.div
            key={selectedVolume} // Re-animate when volume changes
            className={`relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] ${canOpen ? 'cursor-pointer' : 'opacity-50 grayscale cursor-not-allowed'}`}
            initial={{ scale: 0.8, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: canOpen ? 1 : 0.5, y: canOpen ? [0, -10, 0] : 0, x: 0 }}
            whileHover={canOpen ? { scale: 1.05, rotate: 2 } : {}}
            whileTap={canOpen ? { scale: 0.95 } : {}}
            onClick={() => canOpen && navigate('/gacha', { state: { volume: selectedVolume } })}
            transition={{ 
              scale: { type: 'spring' },
              opacity: { duration: 0.2 },
              x: { type: 'spring', damping: 20 },
              y: canOpen ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : {}
            }}
          >
            <div className="absolute inset-0 bg-[#d7b73b] opacity-20 blur-3xl rounded-full" />
            
            {/* Box Image */}
            <img 
              src={selectedVolume === 1 ? "/images/booster box.webp" : selectedVolume === 2 ? "/images/vol2/booster box vol 2.webp" : "/images/vol3/booster box vol 3.png"} 
              alt={`Booster Box Vol ${selectedVolume}`} 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
            />
            
            {/* Volume Label */}
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 z-30 bg-black/80 border border-[#d7b73b] px-4 py-1 rounded-full text-[#d7b73b] font-bold whitespace-nowrap text-sm sm:text-base">
              VOL {selectedVolume}: {selectedVolume === 1 ? 'MABA' : selectedVolume === 2 ? 'SEMESTER AKHIR' : 'NEW JOURNEY SKRIPSI'}
            </div>

            {/* Status Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
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
              <span className="text-[#d7b73b] font-bold">{gachaCount} / {MAX_GACHA} Tiket</span>
            </div>
          </motion.div>

          {/* Right Arrow */}
          <button 
            onClick={() => setSelectedVolume(prev => prev === 3 ? 1 : prev + 1)}
            className="absolute right-0 z-30 p-2 bg-black/50 hover:bg-black/80 rounded-full text-[#d7b73b] border border-[#d7b73b] transition-all"
            aria-label="Next Box"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        {/* Info Icon */}
        <div className="flex justify-center mb-1 z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsInfoModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 hover:border-[#d7b73b]/40 text-white/50 hover:text-[#d7b73b] rounded-full transition-all text-xs font-bold cursor-pointer"
          >
            <Info size={13} />
            <span>Info & Gacha Rate</span>
          </motion.button>
        </div>

        {/* Pity Progress Bar */}
        <motion.div 
          className="w-full bg-[#121214]/85 backdrop-blur-md border border-white/10 rounded-[18px] p-4 flex flex-col gap-2 relative overflow-hidden mb-4 mt-2 shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center text-xs font-[800] text-white/70">
            <span className="flex items-center gap-1.5">
              🎯 Pity Meter (Vol {selectedVolume}): <span className="text-[#d7b73b]">{currentPity}</span>/20
            </span>
            {currentPity >= 20 ? (
              <span className="text-[#d7b73b] animate-pulse tracking-wide font-black">PITY AKTIF!</span>
            ) : (
              <span className="text-white/40 font-medium">Jaminan SR+ pada gacha ke-21</span>
            )}
          </div>
          <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-[#8a2be2] via-[#da70d6] to-[#d7b73b]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (currentPity / 20) * 100)}%` }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              style={{ 
                boxShadow: currentPity >= 20 ? '0 0 12px #d7b73b' : 'none'
              }}
            />
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
            onClick={() => navigate('/gacha', { state: { volume: selectedVolume } })}
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

      {/* Floating Announcements */}
      {/* Desktop: Bottom Left */}
      <motion.div
        className="fixed bottom-8 left-8 z-50 hidden md:block cursor-pointer"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.5 }}
        onClick={() => setIsPatchNoteOpen(true)}
      >
        <Announcement>
          <AnnouncementTag>Update v2.0</AnnouncementTag>
          <AnnouncementTitle>
            Patch Ledakan Peniada Semester
            <ArrowUpRightIcon size={16} className="shrink-0 text-[#d7b73b]" />
          </AnnouncementTitle>
        </Announcement>
      </motion.div>

      {/* Mobile: Bottom Right Blinking Icon */}
      <motion.div
        className="fixed bottom-6 right-4 z-50 md:hidden cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsPatchNoteOpen(true)}
      >
        <div className="relative flex items-center justify-center gap-2 bg-[#111] border border-[#d7b73b] rounded-full shadow-[0_0_15px_rgba(215,183,59,0.3)] px-4 py-2 group">
          <div className="absolute inset-0 bg-[#d7b73b]/20 animate-pulse rounded-full" />
          <Bell className="w-4 h-4 text-[#d7b73b] animate-bounce" />
          <span className="text-[#d7b73b] font-bold text-xs tracking-wider uppercase relative z-10">New Update</span>
          {/* Notification Dot */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-[#111] animate-ping" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-[#111]" />
        </div>
      </motion.div>

      <PatchNoteModal isOpen={isPatchNoteOpen} onClose={() => setIsPatchNoteOpen(false)} />
      <BoosterInfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} volume={selectedVolume} />
    </div>
  );
};
