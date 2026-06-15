import React from 'react';
import type { ActiveCard } from '../types';

type Skill = { name: string; sksCost: number; damage: number };

type SkillPanelProps = {
  card: ActiveCard;
  hasRetreated: boolean;
  onUseSkill: (index: number) => void;
  onRetreat: () => void;
  onEndTurn: () => void;
  onClose: () => void;
  closing?: boolean;
};

function SkillRow({
  skill,
  attachedSKS,
  onUse,
}: {
  skill: Skill;
  attachedSKS: number;
  onUse: () => void;
}) {
  const canUse = attachedSKS >= skill.sksCost;

  return (
    <button
      type="button"
      className={`skill-row w-full text-left ${canUse ? 'skill-row--available' : 'skill-row--unavailable'}`}
      onClick={canUse ? onUse : undefined}
      disabled={!canUse}
    >
      <span className="text-[#fbbf24] text-xs font-bold shrink-0">
        {'⚡'.repeat(Math.min(skill.sksCost, 3))}
        {skill.sksCost > 3 ? `+${skill.sksCost - 3}` : ''}
      </span>
      <span className="flex-1 text-sm font-bold text-white">{skill.name}</span>
      <span className="skill-row__damage">{skill.damage}</span>
    </button>
  );
}

export const SkillPanel: React.FC<SkillPanelProps> = ({
  card,
  hasRetreated,
  onUseSkill,
  onRetreat,
  onEndTurn,
  onClose,
  closing,
}) => {
  const canRetreat =
    !hasRetreated && card.attachedSKS >= card.cardData.retreatCost;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[290] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Tutup panel"
      />
      <div className={`skill-panel ${closing ? 'skill-panel--closing' : ''}`}>
        <div className="skill-panel__handle" />

        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-white">{card.cardData.name}</span>
          <span
            className="text-sm font-black text-white"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            HP {card.currentHP}/{card.cardData.hp}
          </span>
        </div>

        <div className="mb-3">
          {card.cardData.skills.map((skill, i) => (
            <SkillRow
              key={`${skill.name}-${i}`}
              skill={skill}
              attachedSKS={card.attachedSKS}
              onUse={() => onUseSkill(i)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-150 ${
              canRetreat
                ? 'border-[#2a2a42] text-white bg-[#1c1c2e] active:scale-[0.97]'
                : 'border-[#2a2a42] text-[#3a3a5e] opacity-40'
            }`}
            onClick={canRetreat ? onRetreat : undefined}
            disabled={!canRetreat}
          >
            Bolos ({card.cardData.retreatCost}⚡)
          </button>

          <button
            type="button"
            className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white border border-[#7C3AED] bg-[#7C3AED25] active:scale-[0.97] transition-transform duration-150"
            onClick={onEndTurn}
          >
            Akhiri Giliran
          </button>
        </div>
      </div>
    </>
  );
};
