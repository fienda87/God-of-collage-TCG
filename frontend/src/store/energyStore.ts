import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GachaState {
  gachaCount: number; // Max 2
  lastGachaTime: number | null; // Timestamp when the timer started
  isUnlimited: boolean;
  pityCount: number; // Retained for compatibility
  pityCountVol1: number;
  pityCountVol2: number;
  setGachaData: (data: Partial<GachaState>) => void;
  consumeGacha: () => void;
  canOpenGacha: () => boolean;
  getSecondsUntilNextGacha: () => number;
  checkRefill: () => void;
  incrementPity: (volume?: number) => void;
  resetPity: (volume?: number) => void;
}

export const COOLDOWN_SECONDS = 1800; // 30 minutes
export const MAX_GACHA = 2;

export const useEnergyStore = create<GachaState>()(
  persist(
    (set, get) => ({
      gachaCount: MAX_GACHA,
      lastGachaTime: null,
      isUnlimited: false,
      pityCount: 0,
      pityCountVol1: 0,
      pityCountVol2: 0,
      setGachaData: (data) => set((state) => ({ ...state, ...data })),
      incrementPity: (volume = 1) => set((state) => {
        if (volume === 2) {
          return { pityCountVol2: state.pityCountVol2 + 1 };
        } else {
          return { pityCountVol1: state.pityCountVol1 + 1 };
        }
      }),
      resetPity: (volume = 1) => {
        if (volume === 2) {
          set({ pityCountVol2: 0 });
        } else {
          set({ pityCountVol1: 0 });
        }
      },
      checkRefill: () => {
        const state = get();
        if (state.gachaCount > MAX_GACHA) {
          set({ gachaCount: MAX_GACHA, lastGachaTime: null });
          return;
        }
        
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
        const state = get();
        if (state.isUnlimited) return true;
        return state.gachaCount > 0;
      },
      getSecondsUntilNextGacha: () => {
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
