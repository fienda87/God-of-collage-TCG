import React from 'react';
import type { ActiveCard } from '../types';
import { CardOnBoard } from './CardOnBoard';
import { BenchSlot } from './BenchSlot';

type BenchRowProps = {
  bench: (ActiveCard | null)[];
  variant: 'bench-player' | 'bench-opponent';
  onSlotClick?: (index: number) => void;
  selectedIndex?: number | null;
  pulseIndices?: boolean;
  disabled?: boolean;
  dropTarget?: string | null;
  isDropMode?: boolean;
};

export const BenchRow: React.FC<BenchRowProps> = ({
  bench,
  variant,
  onSlotClick,
  selectedIndex,
  pulseIndices,
  disabled,
  dropTarget,
  isDropMode,
}) => {
  return (
    <div className="flex justify-center" style={{ gap: 6 }}>
      {bench.map((card, index) =>
        card ? (
          <CardOnBoard
            key={card.instanceId}
            card={card}
            variant={variant}
            isSelected={selectedIndex === index}
            isPulsing={pulseIndices}
            onClick={onSlotClick && !disabled ? () => onSlotClick(index) : undefined}
            disabled={disabled}
            isDropTarget={dropTarget === `bench-${index}`}
            isDropMode={isDropMode}
            dropTargetId={variant === 'bench-player' ? `bench-${index}` : undefined}
          />
        ) : (
          <BenchSlot
            key={`empty-${index}`}
            variant={variant}
            isSelected={selectedIndex === index}
            onClick={onSlotClick && !disabled ? () => onSlotClick(index) : undefined}
            dropTarget={dropTarget === `bench-${index}`}
            isDropMode={isDropMode}
            benchIndex={index}
          />
        )
      )}
    </div>
  );
};
