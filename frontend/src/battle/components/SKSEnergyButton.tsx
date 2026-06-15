import React from 'react';

type SKSEnergyButtonProps = {
  hasAttached: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export const SKSEnergyButton: React.FC<SKSEnergyButtonProps> = ({
  hasAttached,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={`sks-btn ${hasAttached ? 'sks-btn--used' : 'sks-btn--ready'}`}
      onClick={onClick}
      disabled={hasAttached || disabled}
    >
      <span>⚡</span>
      <span>{hasAttached ? 'ATTACHED' : 'ATTACH SKS'}</span>
    </button>
  );
};
