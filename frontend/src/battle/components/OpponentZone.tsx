import React from 'react';
import type { PlayerState } from '../types';
import { BenchRow } from './BenchRow';
import { CardOnBoard } from './CardOnBoard';
import { DeckPile } from './DeckPile';
import { NgulangPointTracker } from './NgulangPointTracker';

type OpponentZoneProps = {
  player: PlayerState;
  shakeActive?: boolean;
  onActiveClick?: () => void;
  onBenchClick?: (index: number) => void;
};

export const OpponentZone: React.FC<OpponentZoneProps> = ({
  player,
  shakeActive,
  onActiveClick,
  onBenchClick,
}) => {
  return (
    <div className="zone opponent-zone">
      {/* Opponent Hand Row */}
      <div className="opponent-hand-row">
        <div className="flex -space-x-4">
          {Array.from({ length: player.hand.length }).map((_, idx) => (
            <div
              key={idx}
              className="opponent-hand-card relative transform hover:-translate-y-2 transition-transform duration-150 ease-out"
              style={{
                width: '36px',
                height: '50px',
                borderRadius: '4px',
                border: '1px solid #2a2a42',
                background: '#1c1c2e',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                zIndex: idx,
              }}
            >
              <img
                src="/images/card-back.png"
                alt="Card Back"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="opponent-zone__header">
        <NgulangPointTracker points={player.ngulangPoints} />
        <span className="opponent-zone__name">LAWAN</span>
        <DeckPile cardCount={player.deck.length} />
      </div>

      <div className="opponent-zone__bench">
        <BenchRow
          bench={player.bench}
          variant="bench-opponent"
          onSlotClick={onBenchClick}
          disabled={false}
        />
      </div>

      <div className="opponent-zone__active">
        <CardOnBoard
          card={player.active}
          variant="active-opponent"
          isShaking={shakeActive}
          onClick={onActiveClick}
        />
      </div>
    </div>
  );
};
