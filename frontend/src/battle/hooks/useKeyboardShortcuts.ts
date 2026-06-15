import { useEffect } from 'react';
import { useGameSounds } from './useGameSounds';
import type { InteractionMode } from './useBattleInteraction';

interface KeyboardShortcutsOptions {
  enabled?: boolean;
  onEndTurn?: () => void;
  onToggleLog?: () => void;
  onToggleRules?: () => void;
  onSetMode?: (mode: InteractionMode) => void;
  interactionMode: InteractionMode;
  isMyTurn: boolean;
  hasDrawnThisTurn: boolean;
  mustChooseActive: boolean;
  phase: string;
}

export function useKeyboardShortcuts({
  enabled = true,
  onEndTurn,
  onToggleLog,
  onToggleRules,
  onSetMode,
  interactionMode,
  isMyTurn,
  hasDrawnThisTurn,
  mustChooseActive,
  phase,
}: KeyboardShortcutsOptions) {
  const sfx = useGameSounds();

  useEffect(() => {
    if (!enabled || phase !== 'battle') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        sfx('buttonClick');
        if (interactionMode !== 'none') {
          onSetMode?.('none');
        } else if (onToggleLog) {
          onToggleLog();
        }
        return;
      }

      if (e.key === 'e' || e.key === 'E') {
        if (!isMyTurn || !hasDrawnThisTurn || mustChooseActive) return;
        sfx('buttonClick');
        onEndTurn?.();
        return;
      }

      if (e.key === 'l' || e.key === 'L') {
        sfx('buttonClick');
        onToggleLog?.();
        return;
      }

      if (e.key === 'r' || e.key === 'R') {
        sfx('buttonClick');
        onToggleRules?.();
        return;
      }

      if (e.key >= '1' && e.key <= '3') {
        if (interactionMode === 'retreat' || interactionMode === 'play_bench' || interactionMode === 'attach_sks' || interactionMode === 'evolve') {
          const benchIndex = parseInt(e.key, 10) - 1;
          if (benchIndex >= 0 && benchIndex <= 2) {
            sfx('buttonClick');
            // The actual action is handled by onBenchClick in BattlePage
            // This is just a shortcut to select the bench slot
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    enabled,
    phase,
    interactionMode,
    isMyTurn,
    hasDrawnThisTurn,
    mustChooseActive,
    onEndTurn,
    onToggleLog,
    onToggleRules,
    onSetMode,
    sfx,
  ]);
}