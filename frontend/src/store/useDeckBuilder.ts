import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DeckCard {
  cardId: string;
  cardName: string;
  stage: number;
  element: string;
  quantity: number;
  imageUrl: string;
  hp: number;
  retreatCost: number;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  cards: DeckCard[];
  totalCards: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DeckValidationResult {
  isValid: boolean;
  errors: string[];
  totalCards: number;
}

interface DeckBuilderState {
  // UI State (tidak di-cache)
  isLoading: boolean;
  error: string | null;
  currentEditingDeckId: string | null;

  // Local Storage State
  savedDecks: Deck[];
  playerCollection: { cardId: string; cardName: string; owned: number }[];
  allCards: any[];

  // Working state (deck yang sedang di-edit, tidak di-cache)
  currentDeck: Deck | null;
  currentCards: DeckCard[];
  validation: DeckValidationResult | null;

  // Actions
  loadAllCardsAndCollection: () => Promise<void>;
  createNewDeck: (name: string) => void;
  editDeck: (deckId: string) => void;
  addCardToDeck: (card: DeckCard) => void;
  removeCardFromDeck: (cardId: string) => void;
  updateCardQuantity: (cardId: string, quantity: number) => void;
  validateCurrentDeck: () => void;
  saveDeck: () => void;
  deleteDeck: (deckId: string) => void;
  selectDeckForBattle: (deckId: string) => void;
  cancelEdit: () => void;
  clearCache: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useDeckBuilder = create<DeckBuilderState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      error: null,
      currentEditingDeckId: null,
      savedDecks: [],
      playerCollection: [],
      currentDeck: null,
      currentCards: [],
      validation: null,
      allCards: [],

      loadAllCardsAndCollection: async () => {
        set({ isLoading: true, error: null });
        try {
          // Fetch all battle cards
          const cardsRes = await fetch(`${API_URL}/api/battle/cards`);
          if (!cardsRes.ok) throw new Error('Failed to load cards');
          const cards = await cardsRes.json();
          set({ allCards: cards });

          // Try fetch collection (if logged in)
          const token = localStorage.getItem('token');
          let collectionData = [];
          if (token) {
            const invRes = await fetch(`${API_URL}/api/inventory`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (invRes.ok) {
              const { inventory } = await invRes.json();
              // inventory might return full objects. Map to collection format
              collectionData = inventory.map((item: any) => ({
                cardId: item.card_id,
                cardName: item.card.name,
                owned: item.quantity,
              }));
            }
          }

          // If no collection (guest or empty), give them 4 of every card as "Guest Collection"
          if (collectionData.length === 0) {
            collectionData = cards.map((c: any) => ({
              cardId: c.id,
              cardName: c.name,
              owned: 4, // Max allowed in deck
            }));
          }

          set({ playerCollection: collectionData, isLoading: false });
        } catch (err) {
          console.error(err);
          set({ error: (err as Error).message, isLoading: false });
        }
      },

      createNewDeck: (name: string) => {
        const newDeck: Deck = {
          id: `temp-${Date.now()}`,
          name,
          cards: [],
          totalCards: 0,
          isActive: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set({
          currentDeck: newDeck,
          currentCards: [],
          currentEditingDeckId: null,
          validation: { isValid: false, errors: ['EMPTY_DECK'], totalCards: 0 },
        });
      },

      editDeck: (deckId: string) => {
        const deck = get().savedDecks.find((d) => d.id === deckId);
        if (!deck) {
          set({ error: 'Deck not found' });
          return;
        }
        set({
          currentDeck: { ...deck },
          currentCards: [...deck.cards],
          currentEditingDeckId: deckId,
        });
        get().validateCurrentDeck();
      },

      cancelEdit: () => {
        set({
          currentDeck: null,
          currentCards: [],
          currentEditingDeckId: null,
          validation: null,
          error: null,
        });
      },

      addCardToDeck: (card: DeckCard) => {
        const { currentCards, playerCollection } = get();
        const owned = playerCollection.find((c) => c.cardId === card.cardId);
        
        if (!owned || owned.owned === 0) {
          set({ error: 'You do not own this card' });
          return;
        }

        const existing = currentCards.find((c) => c.cardId === card.cardId);
        let updated = [...currentCards];

        if (existing) {
          if (existing.quantity < 4 && existing.quantity < owned.owned) {
            existing.quantity += 1;
          } else {
            set({ error: 'Max copies reached for this card' });
            return;
          }
        } else {
          updated.push({ ...card, quantity: 1 });
        }

        set({ currentCards: updated, error: null });
        get().validateCurrentDeck();
      },

      removeCardFromDeck: (cardId: string) => {
        const updated = get().currentCards.filter((c) => c.cardId !== cardId);
        set({ currentCards: updated });
        get().validateCurrentDeck();
      },

      updateCardQuantity: (cardId: string, quantity: number) => {
        if (quantity < 1 || quantity > 4) return;
        const updated = get().currentCards.map((c) =>
          c.cardId === cardId ? { ...c, quantity } : c
        );
        set({ currentCards: updated });
        get().validateCurrentDeck();
      },

      validateCurrentDeck: () => {
        const { currentCards } = get();
        const totalCards = currentCards.reduce((sum, c) => sum + c.quantity, 0);
        const errors: string[] = [];

        if (totalCards !== 20) {
          errors.push('DECK_SIZE_INVALID');
        }
        if (currentCards.some((c) => c.quantity > 4)) {
          errors.push('DUPLICATE_EXCEEDS');
        }
        if (totalCards === 0) {
          errors.push('EMPTY_DECK');
        }

        set({
          validation: { isValid: errors.length === 0, errors, totalCards },
        });
      },

      saveDeck: () => {
        const { currentDeck, currentCards, validation, savedDecks, currentEditingDeckId } = get();

        if (!validation?.isValid) {
          set({ error: 'Cannot save invalid deck' });
          return;
        }
        if (!currentDeck) return;

        const updatedDeck: Deck = {
          ...currentDeck,
          cards: currentCards,
          totalCards: validation.totalCards,
          updatedAt: new Date().toISOString(),
        };

        let newSavedDecks = [...savedDecks];

        if (currentEditingDeckId) {
          // Update existing
          const index = newSavedDecks.findIndex((d) => d.id === currentEditingDeckId);
          if (index !== -1) {
            newSavedDecks[index] = updatedDeck;
          }
        } else {
          // Add new
          updatedDeck.id = `deck-${Date.now()}`;
          
          // Make it active if it's the first deck
          if (newSavedDecks.length === 0) {
             updatedDeck.isActive = true;
          }
          
          newSavedDecks.push(updatedDeck);
        }

        set({
          savedDecks: newSavedDecks,
          currentDeck: null,
          currentCards: [],
          currentEditingDeckId: null,
          validation: null,
        });
      },

      deleteDeck: (deckId: string) => {
        const { savedDecks } = get();
        let updatedDecks = savedDecks.filter((d) => d.id !== deckId);
        
        // If we deleted the active deck, make the first one active if available
        if (savedDecks.find(d => d.id === deckId)?.isActive && updatedDecks.length > 0) {
           updatedDecks[0].isActive = true;
        }
        
        set({ savedDecks: updatedDecks });
      },

      selectDeckForBattle: (deckId: string) => {
        const updated = get().savedDecks.map((d) => ({
          ...d,
          isActive: d.id === deckId,
        }));
        set({ savedDecks: updated });
      },

      clearCache: () => {
        set({
          savedDecks: [],
          playerCollection: [],
          allCards: [],
          currentDeck: null,
          currentCards: [],
          currentEditingDeckId: null,
          validation: null,
          error: null,
        });
      },
    }),
    {
      name: 'deck-builder-storage',
      partialize: (state) => ({
        savedDecks: state.savedDecks,
        playerCollection: state.playerCollection,
        allCards: state.allCards,
      }),
      version: 1,
    }
  )
);
