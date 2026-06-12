import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GachaState {
  lastGachaTime: number | null; // Timestamp of last gacha
  isUnlimited: boolean; // TESTING: unlimited gacha mode
  setGachaData: (data: Partial<GachaState>) => void;
  consumeGacha: () => void;
  canOpenGacha: () => boolean;
  getSecondsUntilNextGacha: () => number;
}

const COOLDOWN_SECONDS = 3600; // 1 hour

export const useEnergyStore = create<GachaState>()(
  persist(
    (set, get) => ({
      lastGachaTime: null,
      isUnlimited: false, // Default to false for production
      setGachaData: (data) => set((state) => ({ ...state, ...data })),
      consumeGacha: () => {
        const state = get();
        if (!state.isUnlimited) {
          set({ lastGachaTime: Date.now() });
        }
      },
      canOpenGacha: () => {
        const state = get();
        if (state.isUnlimited) return true;
        if (!state.lastGachaTime) return true;
        
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.lastGachaTime) / 1000);
        return elapsedSeconds >= COOLDOWN_SECONDS;
      },
      getSecondsUntilNextGacha: () => {
        const state = get();
        if (state.isUnlimited || !state.lastGachaTime) return 0;
        
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.lastGachaTime) / 1000);
        const remaining = COOLDOWN_SECONDS - elapsedSeconds;
        return remaining > 0 ? remaining : 0;
      }
    }),
    {
      name: 'goc-gacha-timer',
    }
  )
);
