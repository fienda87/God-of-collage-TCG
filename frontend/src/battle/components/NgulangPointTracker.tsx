import React from 'react';

type NgulangPointTrackerProps = {
  points: number;
  animate?: boolean;
};

export const NgulangPointTracker: React.FC<NgulangPointTrackerProps> = ({
  points,
  animate,
}) => {
  return (
    <div className="ngulang-tracker">
      <span className="ngulang-tracker__label">Ngulang</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`ngulang-dot ${i < points ? 'ngulang-dot--filled' : ''} ${
              animate && i === points - 1 ? 'ngulang-dot--bounce' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};
