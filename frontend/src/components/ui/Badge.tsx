import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'urgent';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '' }) => {
  let baseClass = 'rounded-[var(--radius-badge)] shadow-[var(--shadow-on-dark)] text-[var(--color-card-white)] px-4 py-2 flex items-center justify-center font-heavy ';
  
  if (variant === 'urgent') {
    baseClass = 'rounded-[var(--radius-badge)] shadow-[inset_0_0_0_2px_var(--color-signal-red)] text-[var(--color-signal-red)] px-4 py-2 flex items-center justify-center font-heavy ';
  }
  
  return (
    <div className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
};
