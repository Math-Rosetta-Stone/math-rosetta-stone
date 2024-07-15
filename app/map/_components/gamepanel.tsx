import React from 'react';

interface GamePanelProps {
  mouseLocation: { x: number, y: number } | null;
}

const GamePanel: React.FC<GamePanelProps> = ({ mouseLocation }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 p-4">
      {mouseLocation ? (
        <div>
          <h2 className="text-lg font-bold">Mouse Location</h2>
          <p>X: {mouseLocation.x.toFixed(0)}</p>
          <p>Y: {mouseLocation.y.toFixed(0)}</p>
        </div>
      ) : (
        <div>No location</div>
      )}
    </div>
  );
};

export default GamePanel;
