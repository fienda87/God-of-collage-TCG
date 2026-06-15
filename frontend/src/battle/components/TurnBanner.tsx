import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type TurnBannerProps = {
  isYourTurn: boolean;
  turnNumber: number;
};

export const TurnBanner: React.FC<TurnBannerProps> = ({ isYourTurn, turnNumber }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, [turnNumber, isYourTurn]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`turn-banner-floating ${isYourTurn ? 'turn-banner-floating--mine' : 'turn-banner-floating--theirs'}`}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="turn-banner-floating__turn">Turn {turnNumber}</span>
          <span className="turn-banner-floating__text">
            {isYourTurn ? '⚡ Giliran Kamu!' : '⏳ Giliran Lawan'}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
