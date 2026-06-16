import React from 'react';
import { useLocation } from 'react-router-dom';
import Aurora from '../ui/Aurora';

export const ScatteredBackground: React.FC = () => {
  const location = useLocation();
  const isGachaPage = location.pathname === '/gacha';

  if (isGachaPage) return null;

  return (
    <div className="fixed inset-0 z-0 bg-[#000000] overflow-hidden pointer-events-none">
      <Aurora
        colorStops={["#ffc167","#B497CF","#5227FF"]}
        blend={0.5}
        amplitude={1.0}
        speed={1}
      />
    </div>
  );
};
