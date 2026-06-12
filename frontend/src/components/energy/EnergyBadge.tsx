import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEnergyStore } from '../../store/energyStore';

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}j ${m}m ${s}s`;
  return `${m}m ${s}s`;
};

export const EnergyBadge: React.FC = () => {
  const { currentEnergy, maxEnergy, secondsUntilRefill, isFull, isUnlimited, decrementTimer } = useEnergyStore();
  const isCounting = !isFull && !isUnlimited;

  useEffect(() => {
    if (!isCounting) return;
    
    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isCounting, decrementTimer]);

  // Border and text colors per spec: white when full, Signal Red when counting
  const borderColor = isCounting ? '#fe2f2f' : '#ffffff';
  const textColor = isCounting ? '#fe2f2f' : '#ffffff';

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        animate={isCounting ? {
          scale: [1, 1.03, 1],
          transition: { duration: 0.5, repeat: Infinity, repeatDelay: 10 }
        } : {}}
        className="rounded-[38px] px-6 py-2 flex items-center justify-center font-[800]"
        style={{ 
          boxShadow: `${borderColor} 0px 0px 0px 2px inset`,
          color: textColor,
        }}
      >
        <span className="text-[20px]">
          {isUnlimited ? '∞' : currentEnergy}/{maxEnergy} ⚡
        </span>
      </motion.div>
      {isCounting && (
        <div className="mt-2 text-[14px] font-[800] text-white/80">
          ⏳ {formatTime(secondsUntilRefill)}
        </div>
      )}
    </div>
  );
};
