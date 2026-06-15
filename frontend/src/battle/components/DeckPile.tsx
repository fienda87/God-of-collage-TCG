import React from 'react';

type DeckPileProps = {
  cardCount: number;
  canDraw?: boolean;
  deckRef?: React.RefObject<HTMLDivElement | null>;
  onDraw?: () => void;
};

export const DeckPile: React.FC<DeckPileProps> = ({ cardCount, canDraw, deckRef, onDraw }) => {
  return (
    <div
      ref={deckRef}
      className={`deck-pile ${canDraw ? 'deck-pile--glow' : ''}`}
      aria-label={`Deck ${cardCount} kartu`}
      onClick={canDraw ? onDraw : undefined}
    >
      <div className="deck-pile__card deck-pile__card--back2">
        <img src="/images/card-back.png" alt="" className="deck-pile__img" draggable={false} />
      </div>
      <div className="deck-pile__card deck-pile__card--back1">
        <img src="/images/card-back.png" alt="" className="deck-pile__img" draggable={false} />
      </div>
      <div className="deck-pile__card deck-pile__card--front">
        <img src="/images/card-back.png" alt="" className="deck-pile__img" draggable={false} />
      </div>
      <span className="deck-pile__count">{cardCount}</span>
    </div>
  );
};
