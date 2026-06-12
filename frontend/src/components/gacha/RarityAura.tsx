import React from 'react';
import { motion } from 'framer-motion';

interface RarityAuraProps {
  stage: number; // 1 or 2
}

export const RarityAura: React.FC<RarityAuraProps> = ({ stage }) => {
  const color = stage === 1 ? 'var(--color-stage1-glow)' : 'var(--color-stage2-glow)';
  const particleCount = stage === 1 ? 16 : 24;
  const particles = Array.from({ length: particleCount });

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Aura Glow */}
      <motion.div
        className="absolute w-full h-full rounded-[20px]"
        initial={{ opacity: 0, scale: 0.8, boxShadow: `0 0 0px ${color}` }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.8, 1.2, 1.4],
          boxShadow: `0 0 40px 10px ${color}`
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      
      {/* Particle Burst */}
      {particles.map((_, i) => {
        const angle = (i / particleCount) * 2 * Math.PI;
        const distance = stage === 1 ? 100 : 150;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ 
              x: x + (Math.random() * 40 - 20), 
              y: y + (Math.random() * 40 - 20) - (stage === 2 ? 50 : 0), // gold drifts up
              opacity: 0, 
              scale: 0 
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};
