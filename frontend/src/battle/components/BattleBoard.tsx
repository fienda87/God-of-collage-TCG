import React from 'react';
import type { PlayerState, CardData } from '../types';
import type { InteractionMode } from '../hooks/useBattleInteraction';
import { OpponentZone } from './OpponentZone';
import { PlayerZone } from './PlayerZone';
import { BattleConnectionStatus } from './BattleConnectionStatus';
import { TurnTimer } from './TurnTimer';

type BattleBoardProps = {
  opponent: PlayerState;
  player: PlayerState;
  isMyTurn: boolean;
  turnNumber: number;
  roomCode: string | null;
  hasDrawnThisTurn: boolean;
  mustChooseActive: boolean;
  interactionMode: InteractionMode;
  selectedBenchIndex: number | null;
  selectedHandIndex: number | null;
  shakeOpponent: boolean;
  canDraw: boolean;
  canEvolveCard: (card: CardData) => boolean;
  deckRef: React.RefObject<HTMLDivElement | null>;
  onDraw: () => void;
  onActiveClick: () => void;
  onBenchClick: (index: number) => void;
  onHandClick: (index: number) => void;
  onAttachSks: () => void;
  onSetMode: (mode: InteractionMode) => void;
  onDragStart: (cardIndex: number, e: React.PointerEvent) => void;
  onDragMove: (e: React.PointerEvent) => void;
  onDragEnd: (e: React.PointerEvent) => void;
  dragCardIndex: number | null;
  dropTarget: string | null;
  onOpponentActiveClick: () => void;
  onOpponentBenchClick: (index: number) => void;
  turnTimeLeft: number;
};

export const BattleBoard: React.FC<BattleBoardProps> = ({
  opponent,
  player,
  isMyTurn,
  turnNumber,
  roomCode,
  hasDrawnThisTurn,
  mustChooseActive,
  interactionMode,
  selectedBenchIndex,
  selectedHandIndex,
  shakeOpponent,
  canDraw,
  canEvolveCard,
  deckRef,
  onDraw,
  onActiveClick,
  onBenchClick,
  onHandClick,
  onAttachSks,
  onSetMode,
  onDragStart,
  onDragMove,
  onDragEnd,
  dragCardIndex,
  dropTarget,
  onOpponentActiveClick,
  onOpponentBenchClick,
  turnTimeLeft,
}) => {
  const canMainPhase = isMyTurn && hasDrawnThisTurn && !mustChooseActive;

  return (
    <>
      <BattleConnectionStatus />
      <div
        className="battle-board"
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
      >
        <OpponentZone
          player={opponent}
          shakeActive={shakeOpponent}
          onActiveClick={onOpponentActiveClick}
          onBenchClick={onOpponentBenchClick}
        />

        <div className="arena-divider">
          {canDraw ? (
            <span
              className="arena-divider__turn arena-divider__turn--mine"
              style={{ cursor: 'pointer' }}
              onClick={onDraw}
            >
              Draw Kartu
            </span>
          ) : (
            <span
              className={`arena-divider__turn ${
                isMyTurn ? 'arena-divider__turn--mine' : 'arena-divider__turn--theirs'
              }`}
            >
              {mustChooseActive
                ? 'Pilih Active!'
                : isMyTurn
                ? 'Giliran Kamu'
                : 'Giliran Lawan'}
            </span>
          )}
          <div className="arena-divider__timer">
            <TurnTimer timeLeft={turnTimeLeft} isYourTurn={isMyTurn} isWarning={turnTimeLeft <= 10} />
          </div>
          <span className="arena-divider__info">
            T{turnNumber}
            {roomCode ? ` · ${roomCode}` : ''}
          </span>
        </div>

        <PlayerZone
          player={player}
          isMyTurn={isMyTurn}
          hasDrawnThisTurn={hasDrawnThisTurn}
          interactionMode={interactionMode}
          selectedBenchIndex={selectedBenchIndex}
          selectedHandIndex={selectedHandIndex}
          mustChooseActive={mustChooseActive}
          canMainPhase={canMainPhase}
          canDraw={canDraw}
          canEvolveCard={canEvolveCard}
          deckRef={deckRef}
          onDraw={onDraw}
          onActiveClick={onActiveClick}
          onBenchClick={onBenchClick}
          onHandClick={onHandClick}
          onAttachSks={onAttachSks}
          onSetMode={onSetMode}
          onDragStart={onDragStart}
          dragCardIndex={dragCardIndex}
          dropTarget={dropTarget}
        />
      </div>
    </>
  );
};
