import React from 'react';
import { useDeckBuilder } from '../../store/useDeckBuilder';
import type { DeckCard } from '../../store/useDeckBuilder';
import './DeckPreview.css';

interface DeckPreviewProps {
  cards: DeckCard[];
}

export const DeckPreview: React.FC<DeckPreviewProps> = ({ cards }) => {
  const { updateCardQuantity, removeCardFromDeck } = useDeckBuilder();

  // Group by stage
  const byStage = {
    0: cards.filter(c => c.stage === 0),
    1: cards.filter(c => c.stage === 1),
    2: cards.filter(c => c.stage === 2)
  };

  return (
    <div className="deck-preview-list">
      {([0, 1, 2] as const).map(stage => {
        const stageCards = byStage[stage];
        const stageCount = stageCards.reduce((sum, c) => sum + c.quantity, 0);

        return (
          <div key={stage} className="preview__stage">
            <h4>
              {stage === 0 ? 'MABA' : stage === 1 ? 'KATING' : 'SEMS AKHIR'}
              {stageCount > 0 && ` (${stageCount})`}
            </h4>

            {stageCards.length === 0 ? (
              <p className="stage__empty">No cards</p>
            ) : (
              <div className="stage__cards">
                {stageCards.map(card => (
                  <div key={card.cardId} className="preview-card">
                    <img src={card.imageUrl} alt={card.cardName} className="preview-card__img" />

                    <div className="preview-card__info">
                      <p className="preview-card__name">{card.cardName}</p>
                      <div className="preview-card__quantity">
                        <button
                          onClick={() => {
                            if (card.quantity > 1) {
                              updateCardQuantity(card.cardId, card.quantity - 1);
                            } else {
                              removeCardFromDeck(card.cardId);
                            }
                          }}
                        >
                          −
                        </button>
                        <span>{card.quantity}</span>
                        <button
                          onClick={() => {
                            if (card.quantity < 4) {
                              updateCardQuantity(card.cardId, card.quantity + 1);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="preview-card__remove"
                      onClick={() => removeCardFromDeck(card.cardId)}
                      title="Remove card"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
