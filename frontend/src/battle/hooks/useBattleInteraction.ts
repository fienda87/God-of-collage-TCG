export type InteractionMode =
  | 'none'
  | 'attach_sks'
  | 'play_bench'
  | 'evolve'
  | 'retreat';

export type BattleInteractionState = {
  mode: InteractionMode;
  selectedHandIndex: number | null;
  selectedBenchIndex: number | null;
  skillPanelOpen: boolean;
  skillPanelClosing: boolean;
};

export const initialInteractionState: BattleInteractionState = {
  mode: 'none',
  selectedHandIndex: null,
  selectedBenchIndex: null,
  skillPanelOpen: false,
  skillPanelClosing: false,
};

export function resetInteraction(): BattleInteractionState {
  return { ...initialInteractionState };
}
