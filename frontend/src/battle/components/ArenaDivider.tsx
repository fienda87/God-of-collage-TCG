import React from 'react';

type ArenaDividerProps = {
  isMyTurn: boolean;
  turnNumber: number;
  roomCode?: string | null;
  showDrawButton?: boolean;
  onDraw?: () => void;
};

export const ArenaDivider: React.FC<ArenaDividerProps> = ({
  isMyTurn,
  turnNumber,
  roomCode,
  showDrawButton,
  onDraw,
}) => {
  return (
    <div className="arena-divider">
      {showDrawButton && onDraw ? (
        <button
          type="button"
          onClick={onDraw}
          className="arena-divider__draw"
        >
          Draw Kartu
        </button>
      ) : (
        <span
          className={`arena-divider__turn ${
            isMyTurn ? 'arena-divider__turn--mine' : 'arena-divider__turn--theirs'
          }`}
        >
          {isMyTurn ? 'Giliran Kamu' : 'Giliran Lawan'}
        </span>
      )}
      <span className="arena-divider__info">
        T{turnNumber}
        {roomCode ? ` · ${roomCode}` : ''}
      </span>
    </div>
  );
};
