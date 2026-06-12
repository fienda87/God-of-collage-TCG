import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CollectionState {
  cards: any[];
  setCards: (cards: any[]) => void;
}

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set) => ({
      cards: [],
      setCards: (cards) => set({ cards }),
    }),
    {
      name: 'goc-collection', // name of the item in the storage (must be unique)
    }
  )
);
