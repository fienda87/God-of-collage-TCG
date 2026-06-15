import React from 'react';
import type { ActiveCard, CardData } from '../types';
import { BATTLE_COLORS, ELEMENT_ICONS, STAGE_COLORS, STAGE_LABELS } from '../tokens/colors';

interface CardDetailModalProps {
  card: CardData;
  activeCardState?: ActiveCard | null;
  onClose: () => void;
  onPlay?: () => void;
  playable?: boolean;

  // Active card action props
  isMyActive?: boolean;
  hasRetreated?: boolean;
  onUseSkill?: (index: number) => void;
  onRetreat?: () => void;
  onEndTurn?: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  activeCardState,
  onClose,
  onPlay,
  playable,
  isMyActive,
  hasRetreated,
  onUseSkill,
  onRetreat,
  onEndTurn,
}) => {
  const elementColor = BATTLE_COLORS.element[card.element];

  const currentHP = activeCardState ? activeCardState.currentHP : card.hp;
  const attachedSKS = activeCardState ? activeCardState.attachedSKS : 0;

  const canRetreat =
    isMyActive &&
    !hasRetreated &&
    onRetreat &&
    attachedSKS >= card.retreatCost;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="card-detail-modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="card-detail__hero">
          {card.imageUrl ? (
            <img src={card.imageUrl} alt={card.name} />
          ) : (
            <div className="w-full h-full" style={{ background: `${elementColor}15` }} />
          )}

          <span
            className="card-detail__hero-badge"
            style={{ background: STAGE_COLORS[card.stage] }}
          >
            {STAGE_LABELS[card.stage]}
          </span>

          <span className="card-detail__hero-element">
            {ELEMENT_ICONS[card.element]}
          </span>

          {card.isEX && (
            <span className="card-detail__hero-ex">EX</span>
          )}
        </div>

        <div className="card-detail__body">
          <div className="card-detail__header">
            <div>
              <h3 className="card-detail__name">{card.name}</h3>
              <p className="card-detail__stage">
                {card.element}
                {card.evolvesFrom && ` · Evolves from ${card.evolvesFrom}`}
              </p>
            </div>
            <span className="card-detail__hp-badge">{currentHP}/{card.hp} HP</span>
          </div>

          <div className="card-detail__stats-grid">
            <div className="card-detail__stat">
              <span className="card-detail__stat-label">Retreat</span>
              <span className="card-detail__stat-value">{card.retreatCost} ⚡</span>
            </div>
            <div className="card-detail__stat">
              <span className="card-detail__stat-label">Weakness</span>
              <span className="card-detail__stat-value">
                {ELEMENT_ICONS[card.weakness]} {card.weakness}
              </span>
            </div>
            <div className="card-detail__stat">
              <span className="card-detail__stat-label">Stage</span>
              <span className="card-detail__stat-value">{card.stage}</span>
            </div>
          </div>

          {activeCardState && (
            <div className="card-detail__stat" style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: '8px 16px' }}>
              <span className="card-detail__stat-label" style={{ margin: 0 }}>Attached SKS Energy</span>
              <div className="sks-dots">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`sks-dot ${i < attachedSKS ? 'sks-dot--filled' : 'sks-dot--empty'}`}
                  />
                ))}
              </div>
            </div>
          )}

          {card.skills.length > 0 && (
            <div className="card-detail__skills-section">
              <span className="card-detail__skills-title">Skills</span>
              {card.skills.map((skill, i) => {
                const canUse = isMyActive && attachedSKS >= skill.sksCost;
                if (isMyActive && onUseSkill) {
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`skill-row w-full text-left ${canUse ? 'skill-row--available' : 'skill-row--unavailable'}`}
                      onClick={canUse ? () => onUseSkill(i) : undefined}
                      disabled={!canUse}
                      style={{ padding: '10px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1c1c2e', border: '1.5px solid transparent', cursor: canUse ? 'pointer' : 'not-allowed' }}
                    >
                      <span className="text-[#fbbf24] text-xs font-bold shrink-0">
                        {'⚡'.repeat(Math.min(skill.sksCost, 3))}
                        {skill.sksCost > 3 ? `+${skill.sksCost - 3}` : ''}
                      </span>
                      <span className="flex-1 text-sm font-bold text-white ml-2">{skill.name}</span>
                      <span className="skill-row__damage text-sm font-black text-[#ef4444]">{skill.damage}</span>
                    </button>
                  );
                }

                return (
                  <div key={i} className="card-detail__skill-item" style={{ cursor: 'default' }}>
                    <span className="card-detail__skill-name">{skill.name}</span>
                    <div className="card-detail__skill-meta">
                      <span className="card-detail__skill-cost">
                        {'⚡'.repeat(Math.min(skill.sksCost, 4))}
                        {skill.sksCost > 4 ? `+${skill.sksCost - 4}` : ''}
                      </span>
                      <span className="card-detail__skill-damage">{skill.damage}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isMyActive && onRetreat && onEndTurn && (
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-150 ${
                  canRetreat
                    ? 'border-[#2a2a42] text-white bg-[#1c1c2e] active:scale-[0.97] cursor-pointer'
                    : 'border-[#2a2a42] text-[#3a3a5e] opacity-40 cursor-not-allowed'
                }`}
                onClick={canRetreat ? onRetreat : undefined}
                disabled={!canRetreat}
              >
                Bolos ({card.retreatCost}⚡)
              </button>

              <button
                type="button"
                className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white border border-[#7C3AED] bg-[#7C3AED25] active:scale-[0.97] transition-transform duration-150 cursor-pointer"
                onClick={onEndTurn}
              >
                Akhiri Giliran
              </button>
            </div>
          )}

          {playable && onPlay && (
            <button className="btn-play mt-2" onClick={onPlay}>
              Mainkan ke Board
            </button>
          )}
        </div>
      </div>
    </>
  );
};
