import React from 'react';
import './CardCollection.css';

interface CardCollectionProps {
  cards: any[];
  onCardClick: (card: any) => void;
}

export const CardCollection: React.FC<CardCollectionProps> = ({ cards, onCardClick }) => {
  if (cards.length === 0) {
    return <div className="collection-empty">No cards found</div>;
  }

  return (
    <div className="card-collection-grid">
      {cards.map(card => (
        <div 
          key={card.id} 
          className="collection-card" 
          onClick={() => onCardClick(card)}
          title={`Click to add ${card.name} to deck`}
        >
          <img src={card.image_url || card.imageUrl} alt={card.name} className="collection-card__image" />
          <div className="collection-card__overlay">
            <span className="add-icon">+</span>
          </div>
        </div>
      ))}
    </div>
  );
};
