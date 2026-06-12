import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GachaState {
  gachaCount: number; // Max 2
  lastGachaTime: number | null; // Timestamp when the timer started
  isUnlimited: boolean;
  setGachaData: (data: Partial<GachaState>) => void;
  consumeGacha: () => void;
  canOpenGacha: () => boolean;
  getSecondsUntilNextGacha: () => number;
  checkRefill: () => void;
}

const COOLDOWN_SECONDS = 3600; // 1 hour
const MAX_GACHA = 2;

export const useEnergyStore = create<GachaState>()(
  persist(
    (set, get) => ({
      gachaCount: MAX_GACHA,
      lastGachaTime: null,
      isUnlimited: false,
      setGachaData: (data) => set((state) => ({ ...state, ...data })),
      checkRefill: () => {
        const state = get();
        if (state.gachaCount >= MAX_GACHA || !state.lastGachaTime) return;
        
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - state.lastGachaTime) / 1000);
        const earned = Math.floor(elapsedSeconds / COOLDOWN_SECONDS);
        
        if (earned > 0) {
          let newCount = state.gachaCount + earned;
          let newTime: number | null = state.lastGachaTime + (earned * COOLDOWN_SECONDS * 1000);
          
          if (newCount >= MAX_GACHA) {
            newCount = MAX_GACHA;
            newTime = null;
          }
          
          set({ gachaCount: newCount, lastGachaTime: newTime });
        }
      },
      consumeGacha: () => {
        get().checkRefill();
        const state = get();
        if (!state.isUnlimited) {
          if (state.gachaCount > 0) {
            const newCount = state.gachaCount - 1;
            // Jika ini gacha pertama yang dikonsumsi (dari penuh), mulai timer
            const newTime = state.gachaCount === MAX_GACHA ? Date.now() : state.lastGachaTime;
            set({ gachaCount: newCount, lastGachaTime: newTime });
          }
        }
      },
      canOpenGacha: () => {
        get().checkRefill();
        const state = get();
        if (state.isUnlimited) return true;
        return state.gachaCount > 0;
      },
      getSecondsUntilNextGacha: () => {
        get().checkRefill();
        const state = get();
        if (state.isUnlimited || state.gachaCount >= MAX_GACHA || !state.lastGachaTime) return 0;
        
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
