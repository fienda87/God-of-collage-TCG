import React from 'react';
import { motion } from 'framer-motion';

interface CardProps extends React.ComponentProps<typeof motion.div> {
  variant?: 'base' | 'chromatic-red' | 'chromatic-violet' | 'chromatic-gold' | 'pastel';
  pastelColor?: 'lemon' | 'lavender' | 'cobalt' | 'sky' | 'bubblegum' | 'mint' | 'tangerine';
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'base',
  pastelColor = 'lemon',
  className = '',
  ...props 
}) => {
  let baseClass = 'rounded-[var(--radius-card)] p-[var(--spacing-20)] text-[var(--color-game-night-black)] font-heavy bg-[var(--color-card-white)] ';
  
  if (variant === 'base') {
    baseClass += 'shadow-[var(--shadow-on-light)] ';
  } else if (variant === 'chromatic-red') {
    baseClass += 'shadow-[inset_0_0_0_2px_var(--color-signal-red)] ';
  } else if (variant === 'chromatic-violet') {
    baseClass += 'shadow-[inset_0_0_0_2px_var(--color-royal-violet)] ';
  } else if (variant === 'chromatic-gold') {
    baseClass += 'shadow-[inset_0_0_0_2px_var(--color-antique-gold)] ';
  } else if (variant === 'pastel') {
    baseClass += `shadow-[var(--shadow-on-light)] bg-[var(--color-${pastelColor}-card)] `;
  }

  return (
    <motion.div 
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
