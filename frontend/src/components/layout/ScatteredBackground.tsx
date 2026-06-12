import React from 'react';
import PixelBlast from './PixelBlast';

export const ScatteredBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000] overflow-hidden pointer-events-none">
      <PixelBlast
        variant="square"
        pixelSize={4}
        color="#B497CF"
        patternScale={2}
        patternDensity={1}
        pixelSizeJitter={0}
        enableRipples={true}
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.5}
        edgeFade={0.25}
        transparent={true}
        className="pointer-events-auto"
      />
    </div>
  );
};
