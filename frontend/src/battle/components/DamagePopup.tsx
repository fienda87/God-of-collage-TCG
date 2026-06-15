import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type DamagePopupProps = {
  damage: number;
  isWeakness: boolean;
  x: number;
  y: number;
};

export function DamagePopup({ damage, isWeakness, x, y }: DamagePopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className="damage-popup-root"
          style={{ position: 'fixed', left: x, top: y, zIndex: 1000, pointerEvents: 'none' }}
          initial={{ opacity: 0, scale: 0.3, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.3, 1, 0.8], y: [0, -20, -50, -80] }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
        >
          {isWeakness && (
            <motion.div
              className="damage-popup__weakness-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              WEAKNESS!
            </motion.div>
          )}
          <div
            className={`damage-popup__number ${isWeakness ? 'damage-popup__number--weakness' : ''}`}
          >
            -{damage}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
