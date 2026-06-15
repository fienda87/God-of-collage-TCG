import React from 'react';
import { useBattleStore } from '../useBattle';
import './ConnectionStatus.css';

export const BattleConnectionStatus: React.FC = () => {
  const { connectionStatus, reconnectAttempts, maxReconnectAttempts } = useBattleStore();

  if (connectionStatus === 'connected') return null;

  return (
    <div className={`connection-indicator connection-indicator--${connectionStatus}`}>
      {connectionStatus === 'disconnected' && (
        <>
          <span className="indicator__icon">⚠️</span>
          <span className="indicator__text">Connection lost</span>
        </>
      )}
      {connectionStatus === 'reconnecting' && (
        <>
          <span className="indicator__icon spinner">⟳</span>
          <span className="indicator__text">
            Reconnecting ({reconnectAttempts}/{maxReconnectAttempts})...
          </span>
        </>
      )}
    </div>
  );
};
