import React from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  offsetY?: number;
  offsetX?: number;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  offsetY = 0,
  offsetX = 0,
  className = '',
  style = {},
  zIndex,
}) => {
  return (
    <div
      className={`pointer-events-none will-change-transform transition-transform duration-75 ease-out ${className}`}
      style={{
        transform: `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`,
        zIndex,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
