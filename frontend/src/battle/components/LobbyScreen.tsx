import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeckBuilder } from '../../store/useDeckBuilder';
import { DeckList } from '../../components/deck/DeckList';

type LobbyScreenProps = {
  onCreateRoom: (deck: any[]) => void;
  onJoinRoom: (code: string, deck: any[]) => void;
};

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  onCreateRoom,
  onJoinRoom,
}) => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { savedDecks, createNewDeck, loadAllCardsAndCollection } = useDeckBuilder();

  useEffect(() => {
    loadAllCardsAndCollection();
  }, [loadAllCardsAndCollection]);

  const activeDeck = savedDecks.find(d => d.isActive);

  const handleCreate = () => {
    if (!activeDeck) {
      alert('Please select or create an active deck first!');
      return;
    }
    onCreateRoom(activeDeck.cards);
  };

  const handleJoin = () => {
    if (!activeDeck) {
      alert('Please select or create an active deck first!');
      return;
    }
    onJoinRoom(code, activeDeck.cards);
  };

  return (
    <div className="flex flex-col items-center justify-start h-full px-6 gap-6 pt-10 overflow-y-auto">
      <div className="text-center">
        <h1 className="text-2xl font-black text-white mb-1">Battle Online</h1>
        <p className="text-sm text-[#A0A0B8]">PvP real-time God of College TCG</p>
      </div>

      <button
        type="button"
        onClick={handleCreate}
        className="w-full max-w-xs py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white border-2 border-[#7C3AED] bg-[#7C3AED30] active:scale-[0.97] transition-transform duration-150"
      >
        Buat Room
      </button>

      <div className="w-full max-w-xs flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Kode 6 digit"
          className="flex-1 rounded-xl bg-[#1C1C2E] border border-[#2A2A42] px-4 py-3 text-white text-center tracking-[0.3em] font-mono outline-none focus:border-[#7C3AED]"
        />
        <button
          type="button"
          onClick={handleJoin}
          disabled={code.length !== 6}
          className="px-5 py-3 rounded-xl text-sm font-bold text-white border border-[#C5A028] bg-[#C5A02825] disabled:opacity-40 active:scale-[0.97] transition-transform duration-150"
        >
          Join
        </button>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Your Decks</h2>
          <button
            onClick={() => {
              createNewDeck('New Deck');
              navigate('/battle/deck-builder');
            }}
            className="px-4 py-2 bg-[#3b82f6] text-white font-bold rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            + New Deck
          </button>
        </div>
        <DeckList />
      </div>
    </div>
  );
};
