import React from 'react';
import type { CardData } from '../types';
import { BATTLE_SIZES } from '../tokens/sizes';
import { ELEMENT_ICONS, STAGE_COLORS, STAGE_LABELS } from '../tokens/colors';

type HandCardProps = {
  card: CardData;
  playable?: boolean;
  selected?: boolean;
  roleLabel?: string;
  onClick?: () => void;
  evolveReady?: boolean;
  onDragStart?: (e: React.PointerEvent) => void;
  isDragging?: boolean;
};

export const HandCard: React.FC<HandCardProps> = ({
  card,
  playable,
  selected,
  roleLabel,
  onClick,
  evolveReady,
  onDragStart,
  isDragging,
}) => {
  const { w, h } = BATTLE_SIZES.card.hand;

  return (
    <button
      type="button"
      className={[
        'hand-card',
        playable && 'hand-card--playable',
        selected && 'hand-card--selected',
        !playable && 'hand-card--dimmed',
        evolveReady && 'hand-card--evolve-ready',
        isDragging && 'hand-card--dragging',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        width: `var(--card-hand-w, ${w}px)`,
        height: `var(--card-hand-h, ${h}px)`,
      } as React.CSSProperties}
      onClick={onClick}
      onPointerDown={onDragStart}
    >
      {card.imageUrl ? (
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full bg-[#1C1C2E]" />
      )}

      <span
        className="absolute top-0.5 left-0.5 z-10 px-0.5 py-px rounded text-[6px] font-bold uppercase text-white"
        style={{ background: STAGE_COLORS[card.stage] }}
      >
        {STAGE_LABELS[card.stage]}
      </span>

      <span
        className="absolute top-0.5 right-0.5 z-10 text-[8px]"
        style={{ color: ELEMENT_ICONS[card.element] ? undefined : '#6b7280' }}
      >
        {ELEMENT_ICONS[card.element]}
      </span>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-1 py-1">
        <p className="text-[7px] font-bold text-white truncate leading-tight">{card.name}</p>
        {roleLabel && (
          <p className="text-[6px] text-[#fbbf24] font-bold">{roleLabel}</p>
        )}
      </div>
    </button>
  );
};
