import React from 'react';
import { getCardDimensions, type CardVariant } from '../tokens/sizes';

type BenchSlotProps = {
  variant: 'bench-player' | 'bench-opponent';
  onClick?: () => void;
  isSelected?: boolean;
  dropTarget?: boolean;
  isDropMode?: boolean;
  benchIndex?: number;
};

export const BenchSlot: React.FC<BenchSlotProps> = ({
  variant,
  onClick,
  isSelected,
  dropTarget,
  isDropMode,
  benchIndex,
}) => {
  const dims = getCardDimensions(variant as CardVariant);

  return (
    <button
      type="button"
      className={`bench-slot--empty ${isSelected ? 'bench-slot--empty--active' : ''} ${
        dropTarget && isDropMode ? 'bench-slot--empty--drop-target' : ''
      }`}
      style={{
        width: `var(--card-${variant}-w, ${dims.w}px)`,
        height: `var(--card-${variant}-h, ${dims.h}px)`,
      } as React.CSSProperties}
      onClick={onClick}
      disabled={!onClick}
      data-drop-target={benchIndex !== undefined ? `bench-${benchIndex}` : undefined}
      aria-label="Bench slot kosong"
    >
      +
    </button>
  );
};
