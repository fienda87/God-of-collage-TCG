import React from 'react';
import { useBattleStore } from '../useBattle';
import './PingIndicator.css';

export const PingIndicator: React.FC = () => {
  const { ping, connected } = useBattleStore();

  if (!connected) return null;

  const getPingClass = (): string => {
    if (ping < 100) return 'ping--good';
    if (ping < 300) return 'ping--warn';
    return 'ping--bad';
  };

  const getPingLabel = (): string => {
    if (ping < 100) return 'Good';
    if (ping < 300) return 'Fair';
    return 'Poor';
  };

  return (
    <div className={`ping-indicator ${getPingClass()}`} title={`Ping: ${ping}ms (${getPingLabel()})`}>
      <span className="ping-indicator__dot" />
      <span className="ping-indicator__value">{ping}ms</span>
    </div>
  );
};