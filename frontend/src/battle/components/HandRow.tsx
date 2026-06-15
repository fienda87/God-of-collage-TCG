import React, { useState } from 'react';
import type { CardData } from '../types';
import { HandCard } from './HandCard';
import { CardDetailModal } from './CardDetailModal';

type HandRowProps = {
  cards: CardData[];
  playable?: boolean;
  directClick?: boolean;
  selectedIndex?: number | null;
  onCardClick?: (index: number) => void;
  getRoleLabel?: (index: number) => string | undefined;
  canEvolveCard?: (card: CardData) => boolean;
  onDragStart?: (cardIndex: number, e: React.PointerEvent) => void;
  dragCardIndex?: number | null;
};

export const HandRow: React.FC<HandRowProps> = ({
  cards,
  playable,
  directClick,
  selectedIndex,
  onCardClick,
  getRoleLabel,
  canEvolveCard,
  onDragStart,
  dragCardIndex,
}) => {
  const [modalCardIndex, setModalCardIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (directClick && onCardClick) {
      onCardClick(index);
    } else {
      setModalCardIndex(index);
    }
  };

  const handlePlayCard = () => {
    if (modalCardIndex !== null && onCardClick) {
      onCardClick(modalCardIndex);
    }
    setModalCardIndex(null);
  };

  const selectedCard = modalCardIndex !== null ? cards[modalCardIndex] : null;

  return (
    <>
      <div className="hand-row">
        {cards.map((card, index) => (
          <HandCard
            key={`${card.id}-${index}`}
            card={card}
            playable={playable}
            selected={selectedIndex === index}
            roleLabel={getRoleLabel?.(index)}
            onClick={() => handleCardClick(index)}
            evolveReady={canEvolveCard?.(card) ?? false}
            onDragStart={onDragStart ? (e) => onDragStart(index, e) : undefined}
            isDragging={dragCardIndex === index}
          />
        ))}
      </div>

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          playable={playable && !!onCardClick}
          onClose={() => setModalCardIndex(null)}
          onPlay={handlePlayCard}
        />
      )}
    </>
  );
};
