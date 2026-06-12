import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ToastProps {
  message: string;
  emoji?: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'ambis' | 'santuy' | 'bucin' | 'gold' | 'blue';
}

export const Toast: React.FC<ToastProps> = ({ message, emoji = '🎉', isVisible, onClose, type = 'gold' }) => {
  useEffect(() => {
    if (isVisible) {
      // Fire confetti
      const colors = {
        'ambis': ['#fe2f2f', '#ffffff'],
        'santuy': ['#d7b73b', '#ffffff'],
        'bucin': ['#7333f1', '#ffffff'],
        'gold': ['#d7b73b', '#fffe5b'],
        'blue': ['#1b5bff', '#a0e9ff']
      };
      
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors[type] || colors.gold
      });

      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, type]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: '100%', y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="fixed top-4 right-4 z-[200] bg-black border-2 shadow-[var(--shadow-on-dark)] rounded-[13px] p-4 max-w-[300px] flex items-center gap-4"
        >
          <span className="text-[24px]">{emoji}</span>
          <p className="text-[16px] text-white font-heavy m-0 leading-tight">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
