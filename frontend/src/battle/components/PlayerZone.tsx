import React from 'react';
import type { PlayerState, CardData } from '../types';
import type { InteractionMode } from '../hooks/useBattleInteraction';
import { BenchRow } from './BenchRow';
import { CardOnBoard } from './CardOnBoard';
import { DeckPile } from './DeckPile';
import { HandRow } from './HandRow';
import { NgulangPointTracker } from './NgulangPointTracker';
import { SKSEnergyButton } from './SKSEnergyButton';

type PlayerZoneProps = {
  player: PlayerState;
  isMyTurn: boolean;
  hasDrawnThisTurn: boolean;
  interactionMode: InteractionMode;
  selectedBenchIndex: number | null;
  selectedHandIndex: number | null;
  mustChooseActive: boolean;
  canMainPhase: boolean;
  canDraw: boolean;
  canEvolveCard: (card: CardData) => boolean;
  deckRef: React.RefObject<HTMLDivElement | null>;
  onActiveClick: () => void;
  onBenchClick: (index: number) => void;
  onHandClick: (index: number) => void;
  onDraw: () => void;
  onAttachSks: () => void;
  onSetMode: (mode: InteractionMode) => void;
  onDragStart: (cardIndex: number, e: React.PointerEvent) => void;
  dragCardIndex: number | null;
  dropTarget: string | null;
};

export const PlayerZone: React.FC<PlayerZoneProps> = ({
  player,
  isMyTurn,
  hasDrawnThisTurn,
  interactionMode,
  selectedBenchIndex,
  selectedHandIndex,
  mustChooseActive,
  canMainPhase,
  canDraw,
  canEvolveCard,
  deckRef,
  onDraw,
  onActiveClick,
  onBenchClick,
  onHandClick,
  onAttachSks,
  onDragStart,
  dragCardIndex,
  dropTarget,
}) => {
  const canInteract = isMyTurn && hasDrawnThisTurn && !mustChooseActive;
  const isTargetMode =
    interactionMode === 'attach_sks' ||
    interactionMode === 'play_bench' ||
    interactionMode === 'evolve' ||
    interactionMode === 'retreat' ||
    mustChooseActive;

  return (
    <div className={`zone player-zone ${!isMyTurn ? 'zone--inactive' : ''}`}>
      {canInteract && (
        <div className="player-zone__sks-wrapper">
          <SKSEnergyButton
            hasAttached={player.hasAttachedSKSThisTurn}
            onClick={onAttachSks}
            disabled={!canInteract}
          />
        </div>
      )}

      <div className="player-zone__active">
        <CardOnBoard
          card={player.active}
          variant="active-player"
          isSelected={
            interactionMode === 'attach_sks' || interactionMode === 'evolve'
          }
          onClick={
            canInteract || mustChooseActive
              ? onActiveClick
              : undefined
          }
          isDropTarget={dropTarget === 'active'}
          isDropMode={!!dragCardIndex}
        />
      </div>

      <div className="player-zone__bench">
        <BenchRow
          bench={player.bench}
          variant="bench-player"
          onSlotClick={isTargetMode ? onBenchClick : undefined}
          selectedIndex={selectedBenchIndex}
          pulseIndices={mustChooseActive}
          disabled={!isTargetMode && !mustChooseActive}
          dropTarget={dropTarget}
          isDropMode={!!dragCardIndex}
        />
      </div>

      <div className="player-zone__controls">
        <DeckPile
          cardCount={player.deck.length}
          canDraw={canDraw}
          deckRef={deckRef}
          onDraw={onDraw}
        />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <NgulangPointTracker points={player.ngulangPoints} />
        </div>
      </div>

      <div className="player-zone__hand">
        <HandRow
          cards={player.hand}
          playable={canMainPhase}
          selectedIndex={selectedHandIndex}
          onCardClick={canMainPhase ? onHandClick : undefined}
          canEvolveCard={canEvolveCard}
          onDragStart={onDragStart}
          dragCardIndex={dragCardIndex}
        />
      </div>
    </div>
  );
};
