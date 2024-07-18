'use client';

import React, { useEffect, useState } from 'react';
import GameMap from './_components/gamemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './map.css';
import {Marker, Position, MarkerType} from './types'

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const addMarker = (type: MarkerType) => {
    const newMarker = {position: { x: 500, y: 500}, type: type}; // Default position
    setMarkers([...markers, newMarker]);
  };

  const updateMarkerPosition = (index: number, position: Position) => {
    const updatedMarkers = markers.map((marker, i) => (i === index ? {position, type: marker.type} : marker));
    setMarkers(updatedMarkers);
  };

  return (
    <div className="w-screen h-screen bg-blue-900 flex flex-col">
      <div className="flex-1 flex">
        <div className="w-36 h-full bg-gray-200 p-4 flex items-center justify-center">
          {/* Left controller content */}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-blue-500 relative">
          <div className="relative w-full h-full max-w-6xl max-h-128 overflow-hidden bg-blue-500 pl-4 pr-4 pt-16 pb-16">
            <GameMap markers={markers} onMarkerDrag={updateMarkerPosition} />
          </div>
        </div>
        <div className="w-36 h-full bg-gray-200 p-4 flex flex-col items-center justify-center">
          <button
            onClick={() => addMarker("minigame")}
            className="absolute top-4 right-4 p-2 bg-red-500 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
          <button
            onClick={() => addMarker("map")}
            className="absolute top-4 right-20 p-2 bg-yellow-500 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
