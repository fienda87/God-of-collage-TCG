import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, disabled, ...props }, ref) => {
  // Base styles following DESIGN.md spec exactly
  let bg = 'transparent';
  let color = '#ffffff';
  let shadow = 'rgb(255, 255, 255) 0px 0px 0px 2px inset'; // --shadow-on-dark
  let hoverBg = '#ffffff';
  let hoverColor = '#000000';

  if (variant === 'primary-light') {
    color = '#000000';
    shadow = 'rgb(0, 0, 0) 0px 0px 0px 2px inset'; // --shadow-on-light
    hoverBg = '#000000';
    hoverColor = '#ffffff';
  }

  return (
    <motion.button
      className={`font-[800] rounded-[38px] py-[12px] px-[32px] text-[14px] md:text-[16px] cursor-pointer flex justify-center items-center border-none ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        backgroundColor: bg,
        color: disabled ? 'rgba(255,255,255,0.4)' : color,
        boxShadow: disabled ? 'rgba(255,255,255,0.3) 0px 0px 0px 2px inset' : shadow,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
      whileHover={disabled ? {} : { backgroundColor: hoverBg, color: hoverColor }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});
