import React from 'react';
import type { ActiveCard, CardData } from '../types';
import {
  BATTLE_COLORS,
  ELEMENT_ICONS,
  STAGE_COLORS,
  STAGE_LABELS,
  getHpColor,
} from '../tokens/colors';
import { getCardDimensions, type CardVariant } from '../tokens/sizes';

export type CardOnBoardProps = {
  card: ActiveCard | null;
  variant: CardVariant;
  isSelected?: boolean;
  isPulsing?: boolean;
  isShaking?: boolean;
  isKo?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  isDropTarget?: boolean;
  isDropMode?: boolean;
  dropTargetId?: string;
};

function getImageUrl(card: ActiveCard | CardData): string | undefined {
  if ('cardData' in card) return card.cardData.imageUrl;
  return card.imageUrl;
}

export const CardOnBoard: React.FC<CardOnBoardProps> = ({
  card,
  variant,
  isSelected,
  isPulsing,
  isShaking,
  isKo,
  onClick,
  disabled,
  isDropTarget,
  isDropMode,
  dropTargetId,
}) => {
  const dims = getCardDimensions(variant);

  if (!card) return null;

  const data = card.cardData;
  const hpPct = data.hp > 0 ? Math.max(0, (card.currentHP / data.hp) * 100) : 0;
  const isActive = variant === 'active-player' || variant === 'active-opponent';
  const isEx = data.isEX;

  const classes = [
    'card-on-board',
    isActive && variant === 'active-player' && 'card-on-board--active-player',
    isActive && variant === 'active-opponent' && 'card-on-board--active-opponent',
    isEx && isActive && 'card-on-board--ex',
    isSelected && 'card-on-board--selected',
    isPulsing && 'card-on-board--pulse',
    isShaking && 'card-on-board--shake',
    isKo && 'card-on-board--ko',
    onClick && !disabled && 'card-on-board--clickable',
    isDropTarget && isDropMode && 'card-on-board--drop-hover',
  ]
    .filter(Boolean)
    .join(' ');

  const imageUrl = getImageUrl(card);

  return (
    <button
      type="button"
      className={classes}
      style={{
        width: `var(--card-${variant}-w, ${dims.w}px)`,
        height: `var(--card-${variant}-h, ${dims.h}px)`,
      } as React.CSSProperties}
      onClick={onClick}
      disabled={!onClick || disabled}
      data-drop-target={dropTargetId || (variant === 'active-player' ? 'active' : undefined)}
    >
      <span
        className="absolute top-0.5 left-0.5 z-10 px-1 py-px rounded text-[7px] font-bold uppercase tracking-wider text-white"
        style={{ background: STAGE_COLORS[data.stage] }}
      >
        {STAGE_LABELS[data.stage]}
      </span>

      <span
        className="absolute top-0.5 right-0.5 z-10 text-[9px]"
        style={{ color: BATTLE_COLORS.element[data.element] }}
      >
        {ELEMENT_ICONS[data.element]}
      </span>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={data.name}
          className="absolute inset-0 w-full h-[55%] object-cover object-top"
          draggable={false}
        />
      ) : (
        <div
          className="absolute inset-0 h-[55%]"
          style={{ background: `${BATTLE_COLORS.element[data.element]}15` }}
        />
      )}

      <div className="card-info absolute bottom-0 left-0 right-0">
        <p className="card-info__name px-1">{data.name}</p>
        <div className="hp-bar mx-1">
          <div
            className="hp-bar__fill"
            style={{
              width: `${hpPct}%`,
              background: getHpColor(card.currentHP, data.hp),
            }}
          />
        </div>
        <p className="card-info__hp px-1">
          {card.currentHP}/{data.hp}
        </p>
        <div className="sks-dots px-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`sks-dot ${i < card.attachedSKS ? 'sks-dot--filled' : 'sks-dot--empty'}`}
            />
          ))}
        </div>
      </div>

      {isEx && (
        <span className="absolute bottom-0.5 right-0.5 text-[7px] font-black text-[#fbbf24]">EX</span>
      )}
    </button>
  );
};
