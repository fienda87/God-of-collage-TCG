import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeckBuilder } from '../store/useDeckBuilder';
import { CardCollection } from '../components/deck/CardCollection';
import { DeckPreview } from '../components/deck/DeckPreview';
import './DeckBuilderPage.css';

export const DeckBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentDeck,
    currentCards,
    playerCollection,
    allCards,
    validation,
    isLoading,
    error,
    loadAllCardsAndCollection,
    createNewDeck,
    addCardToDeck,
    cancelEdit,
    saveDeck
  } = useDeckBuilder();

  const [searchQuery, setSearchQuery] = useState('');
  const [elementFilter, setElementFilter] = useState<'all' | 'Ambis' | 'Santuy' | 'Bucin'>('all');
  const [deckName, setDeckName] = useState('New Deck');

  useEffect(() => {
    loadAllCardsAndCollection();
  }, [loadAllCardsAndCollection]);

  useEffect(() => {
    if (currentDeck) {
      setDeckName(currentDeck.name);
    } else {
      // Auto create new deck if none selected
      createNewDeck('New Deck');
    }
  }, [currentDeck, createNewDeck]);

  const filteredCards = allCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesElement = elementFilter === 'all' || card.element === elementFilter;
    const isOwned = playerCollection.some(
      c => c.cardId === card.id && c.owned > 0
    );
    return matchesSearch && matchesElement && isOwned;
  });

  const handleSaveDeck = () => {
    if (currentDeck) {
      const updatedDeck = { ...currentDeck, name: deckName };
      useDeckBuilder.setState({ currentDeck: updatedDeck });
      saveDeck();
      navigate('/battle');
    }
  };

  const handleCancel = () => {
    cancelEdit();
    navigate('/battle');
  };

  if (isLoading || !currentDeck) {
    return <div className="deck-builder-loading">Loading collection...</div>;
  }

  return (
    <div className="deck-builder-page">
      <header className="deck-builder__header">
        <h1>🃏 Deck Builder</h1>
        <p>Build your 20-card deck from your collection</p>
      </header>

      <div className="deck-builder__container">
        {/* LEFT: Collection */}
        <div className="deck-builder__collection">
          <div className="collection__filters">
            <input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter__input"
            />

            <div className="filter__elements">
              {(['all', 'Ambis', 'Santuy', 'Bucin'] as const).map(el => (
                <button
                  key={el}
                  className={`filter__btn ${elementFilter === el ? 'filter__btn--active' : ''}`}
                  onClick={() => setElementFilter(el)}
                >
                  {el === 'all' ? 'All' : el === 'Ambis' ? '📚' : el === 'Santuy' ? '😎' : '💘'}
                </button>
              ))}
            </div>
          </div>

          <CardCollection
            cards={filteredCards}
            onCardClick={(card) => {
              addCardToDeck({
                cardId: card.id,
                cardName: card.name,
                stage: card.stage,
                element: card.element,
                quantity: 1,
                imageUrl: card.image_url || card.imageUrl, // Handle DB vs frontend naming
                hp: card.hp,
                retreatCost: card.retreat_cost || 0 // assuming DB has retreat_cost
              });
            }}
          />
        </div>

        {/* RIGHT: Deck Preview */}
        <div className="deck-builder__preview">
          <div className="preview__header">
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="preview__name-input"
              placeholder="Deck name"
              maxLength={100}
            />
          </div>

          <div className="preview__progress">
            <div className="progress-bar">
              <div
                className={`progress-bar__fill ${(validation?.totalCards ?? 0) === 20 ? 'full' : ''}`}
                style={{
                  width: `${Math.min(((validation?.totalCards ?? 0) / 20) * 100, 100)}%`
                }}
              />
            </div>
            <span className="progress-text">
              {validation?.totalCards ?? 0} / 20 cards
            </span>
          </div>

          <DeckPreview cards={currentCards} />

          <div className="preview__validation">
            {validation?.isValid ? (
              <p className="validation__success">✓ Deck is valid</p>
            ) : (
              <div className="validation__errors">
                {validation?.errors.map(err => (
                  <p key={err} className="validation__error">
                    {err === 'DECK_SIZE_INVALID' && '❌ Deck must be exactly 20 cards'}
                    {err === 'DUPLICATE_EXCEEDS' && '❌ Max 4 copies per card'}
                    {err === 'EMPTY_DECK' && '❌ Deck is empty'}
                  </p>
                ))}
              </div>
            )}
            {error && <p className="validation__error">❌ {error}</p>}
          </div>

          <div className="preview__actions">
            <button
              className="btn btn-save"
              disabled={!validation?.isValid || isLoading}
              onClick={handleSaveDeck}
            >
              {isLoading ? 'Saving...' : 'Save Deck'}
            </button>
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
