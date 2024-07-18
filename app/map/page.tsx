'use client';

import React, { useEffect, useState } from 'react';
import GameMap from './_components/gamemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import './map.css';
import { Marker, Position, Chapter, Land, MinigameMarker, MapMarker} from './types'
import NewWindow from 'react-new-window';
import PopoutForm from './_components/popoutform';


const Map: React.FC = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currChapter, setCurrChapter] = useState<Chapter>(1);
  const [currLand, setCurrLand] = useState<Land>("island");
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  useEffect(() => {
    setMarkers(readMarkers);
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  const clearMarkers = () => setMarkers([]);

  const readMarkers = () => {
    const storedMarkers = localStorage.getItem(`${currLand}${currChapter}markers`);
    return storedMarkers ? JSON.parse(storedMarkers) : [];
  };

  const saveMarkers = () => {
    localStorage.setItem(`${currLand}${currChapter}markers`, JSON.stringify(markers));
  };

  const addMapMarker = (targetLand: Land, targetChapter: Chapter) => {
    const newMapMarker: MapMarker = {
      position: { x: 500, y: 500 },
      type: "map",
      targetLand,
      targetChapter
    }; // Default position
    setMarkers([...markers, newMapMarker]);
  };

  const addMiniGameMarker = () => {
    const newMarker: MinigameMarker = {
      position: { x: 500, y: 500 },
      type: "minigame"
    }; // Default position
    setMarkers([...markers, newMarker]);
  };

  const updateMarkers = (index: number, position: Position) => {
    const updatedMarkers = markers.map((marker, i) =>
      i === index
        ? { ...marker, position }
        : marker
    );
    setMarkers(updatedMarkers);
  };

  const openPopout = () => setIsPopoutOpen(true);
  const closePopout = () => setIsPopoutOpen(false);

  const handlePopoutSubmit = (targetLand: Land, targetChapter: Chapter) => {
    addMapMarker(targetLand, targetChapter);
    closePopout();
  };

  const gameMapManager = {
    markers, setMarkers, updateMarkers,
    currChapter, setCurrChapter, currLand, setCurrLand,
  }

  return (
    <div className="w-screen h-screen bg-blue-900 flex flex-col">
      {isPopoutOpen && (
        <NewWindow onUnload={closePopout}>
          <PopoutForm onSubmit={handlePopoutSubmit} onClose={closePopout} />
        </NewWindow>
      )}
      <div className="flex-1 flex">
        <div className="w-36 h-full bg-gray-200 p-4 flex items-center justify-center">
          {/* Left controller content */}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center bg-blue-500 relative">
          <div className="relative w-full h-full max-w-6xl max-h-128 overflow-hidden bg-blue-500 pl-4 pr-4 pt-16 pb-16">
            <GameMap gameMapManager={gameMapManager} />
          </div>
        </div>
        <div className="w-36 h-full bg-gray-200 p-4 flex flex-col items-center justify-center">
          <button
            onClick={addMiniGameMarker}
            className="absolute top-4 right-4 p-2 bg-red-500 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
          <button
            onClick={openPopout}
            className="absolute top-4 right-20 p-2 bg-yellow-500 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
          <button
            onClick={saveMarkers}
            className="absolute top-20 right-20 p-2 bg-green-500 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faSave} size="lg" />
          </button>
          <button
            onClick={clearMarkers}
            className="absolute top-20 right-4 p-2 bg-green-500 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
