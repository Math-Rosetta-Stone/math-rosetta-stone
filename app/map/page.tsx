'use client';

import React, { useEffect, useState } from 'react';
import GameMap from './_components/gamemap';
import './map.css';

const Map: React.FC = () => {
  const [markerPositions, setMarkerPositions] = useState<{ x: number, y: number }[]>([]);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const addMarker = () => {
    const newMarker = { x: 500, y: 500 }; // Default position
    setMarkerPositions([...markerPositions, newMarker]);
  };

  const updateMarkerPosition = (index: number, position: { x: number, y: number }) => {
    const updatedMarkers = markerPositions.map((marker, i) => (i === index ? position : marker));
    setMarkerPositions(updatedMarkers);
  };

  return (
    <div className="w-screen h-screen bg-blue-900 flex flex-col">
      <div className="flex-1 flex">
        <div className="w-36 h-full bg-gray-200 p-4 flex items-center justify-center">
          {/* Left controller content */}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-blue-500 relative">
          <div className="relative w-full h-full max-w-6xl max-h-128 overflow-hidden bg-blue-500 pl-4 pr-4 pt-8 pb-8">
            <GameMap markerPositions={markerPositions} onMarkerDrag={updateMarkerPosition} />
          </div>
        </div>
        <div className="w-36 h-full bg-gray-200 p-4 flex flex-col items-center justify-center">
          <button
            onClick={addMarker}
            className="mb-4 p-2 bg-blue-500 text-white z-10"
          >
            Add Marker
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
