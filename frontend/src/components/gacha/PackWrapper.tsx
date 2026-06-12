import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PackWrapperProps {
  onOpen: () => void;
}

export const PackWrapper: React.FC<PackWrapperProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Add paper tear sound here
    setTimeout(() => {
      onOpen();
    }, 400); // 400ms tear animation
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative cursor-pointer group"
          onClick={handleOpen}
        >
          <div className="w-[200px] h-[300px] bg-[var(--color-royal-violet)] border-[2px] border-[var(--color-card-white)] rounded-[13px] flex items-center justify-center shadow-[var(--shadow-on-dark)] overflow-hidden">
            <h2 className="text-[28px] text-white font-heavy text-center px-4">BUKA PACK</h2>
          </div>
          {/* Tear line hint */}
          <div className="absolute top-10 w-full border-t-2 border-dashed border-white opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
