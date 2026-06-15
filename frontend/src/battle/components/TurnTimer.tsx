import React from 'react';
import './TurnTimer.css';

interface TurnTimerProps {
  timeLeft: number;
  isYourTurn: boolean;
  isWarning: boolean;
}

export const TurnTimer: React.FC<TurnTimerProps> = ({ timeLeft, isYourTurn, isWarning }) => {
  const progress = Math.max(0, timeLeft / 60);
  const warning = isWarning && timeLeft > 0;

  return (
    <div className={`turn-timer ${isYourTurn ? 'turn-timer--mine' : 'turn-timer--theirs'} ${warning ? 'turn-timer--warning' : ''} ${timeLeft <= 0 ? 'turn-timer--expired' : ''}`}>
      <div className="turn-timer__ring">
        <svg className="turn-timer__svg" viewBox="0 0 64 64">
          <circle
            className="turn-timer__bg"
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="4"
          />
          <circle
            className="turn-timer__progress"
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 28}
            strokeDashoffset={2 * Math.PI * 28 * (1 - progress)}
            style={{
              transition: 'stroke-dashoffset 1s linear, stroke 300ms ease',
            }}
          />
        </svg>
        <span className="turn-timer__text">{timeLeft}</span>
      </div>
      <div className="turn-timer__label">
        {isYourTurn ? 'Giliranmu' : 'Giliran Lawan'}
      </div>
    </div>
  );
};