import React from 'react';

type GameOverModalProps = {
  won: boolean;
  reason: string;
  onPlayAgain: () => void;
};

export const GameOverModal: React.FC<GameOverModalProps> = ({
  won,
  reason,
  onPlayAgain,
}) => {
  return (
    <div className="battle-overlay">
      <div className="battle-modal">
        <h2 className="text-2xl font-black text-white mb-2">
          {won ? 'Menang!' : 'Kalah'}
        </h2>
        <p className="text-sm text-[#A0A0B8] mb-6">{reason}</p>
        <button
          type="button"
          onClick={onPlayAgain}
          className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white border border-[#7C3AED] bg-[#7C3AED40] active:scale-[0.97] transition-transform duration-150"
        >
          Main Lagi
        </button>
      </div>
    </div>
  );
};
