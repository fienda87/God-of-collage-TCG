import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeckBuilder } from '../../store/useDeckBuilder';
import './DeckList.css';

export const DeckList: React.FC = () => {
  const navigate = useNavigate();
  const {
    savedDecks,
    editDeck,
    deleteDeck,
    selectDeckForBattle
  } = useDeckBuilder();

  return (
    <div className="deck-list">
      <h2>My Decks</h2>

      {savedDecks.length === 0 ? (
        <p className="deck-list__empty">No decks yet. Create one!</p>
      ) : (
        <div className="deck-list__grid">
          {savedDecks.map(deck => (
            <div
              key={deck.id}
              className={`deck-card ${deck.isActive ? 'deck-card--active' : ''}`}
            >
              <div className="deck-card__header">
                <h3>{deck.name}</h3>
                {deck.isActive && <span className="deck-card__badge">Active</span>}
              </div>

              <p className="deck-card__info">
                {deck.totalCards} / 20 cards
              </p>

              <div className="deck-card__actions">
                <button
                  className="btn-edit"
                  onClick={() => {
                    editDeck(deck.id);
                    navigate('/battle/deck-builder');
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-select"
                  onClick={() => selectDeckForBattle(deck.id)}
                  disabled={deck.isActive}
                >
                  Select
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    if (window.confirm(`Delete ${deck.name}?`)) {
                      deleteDeck(deck.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
