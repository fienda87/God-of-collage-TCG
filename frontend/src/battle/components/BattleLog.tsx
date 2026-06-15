import React from 'react';
import type { BattleAction } from '../types';
import './BattleLog.css';

interface BattleLogProps {
  log: BattleAction[];
  isOpen: boolean;
  onClose: () => void;
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const getActionText = (action: BattleAction): { text: string; className: string } => {
  switch (action.type) {
    case 'draw_card':
      return {
        text: `Draw: ${action.cardName}`,
        className: 'log-entry--draw',
      };
    case 'play_card':
      return {
        text: `Played ${action.cardName} to ${action.target}`,
        className: 'log-entry--play',
      };
    case 'evolve_card':
      return {
        text: `${action.fromCard} evolved → ${action.toCard}`,
        className: 'log-entry--evolve',
      };
    case 'attach_sks':
      return {
        text: `Attached SKS to ${action.target}`,
        className: 'log-entry--sks',
      };
    case 'attack':
      return {
        text: `${action.skillName} dealt ${action.damage}${action.isWeakness ? ' (WEAKNESS +20)' : ''} damage`,
        className: 'log-entry--attack',
      };
    case 'ko':
      return {
        text: `KO'd ${action.cardName} (+${action.points} Ngulang Point${action.points > 1 ? 's' : ''})`,
        className: 'log-entry--ko',
      };
    case 'retreat':
      return {
        text: `Retreated: ${action.fromCard} → ${action.toCard}`,
        className: 'log-entry--retreat',
      };
    case 'end_turn':
      return {
        text: 'Ended turn',
        className: 'log-entry--endturn',
      };
    case 'game_over':
      return {
        text: `Game Over — ${action.reason}`,
        className: 'log-entry--gameover',
      };
    default:
      return {
        text: 'Unknown action',
        className: '',
      };
  }
};

const BattleLogEntry: React.FC<{ action: BattleAction }> = ({ action }) => {
  const { text, className } = getActionText(action);
  const time = formatTime(action.timestamp);

  return (
    <li className={`log-entry ${className}`}>
      <span className="log-entry__time">{time}</span>
      <span className="log-entry__text">{text}</span>
    </li>
  );
};

export const BattleLog: React.FC<BattleLogProps> = ({ log, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="battle-log-backdrop" onClick={onClose} />
      <div className="battle-log">
        <div className="battle-log__header">
          <h3 className="battle-log__title">Battle Log</h3>
          <button className="battle-log__close" onClick={onClose} aria-label="Close battle log">
            ✕
          </button>
        </div>

        <div className="battle-log__content">
          {log.length === 0 ? (
            <p className="log-empty">Battle has not started yet</p>
          ) : (
            <ul className="log-list">
              {log.map((action, i) => (
                <BattleLogEntry key={i} action={action} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};