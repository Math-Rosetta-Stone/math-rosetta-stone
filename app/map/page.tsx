'use client';

import React, { useEffect, useState } from 'react';
import GameMap from './_components/gamemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash, faSearch, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import './css/map.css';
import { Marker, Position, Chapter, Land, MinigameMarker, MapMarker } from '@/types/map'
import NewWindow from 'react-new-window';
import PopoutForm from './_components/popoutform';
import Dictionary from './_components/dictionary';


const Map: React.FC = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currChapter, setCurrChapter] = useState<Chapter>(1);
  const [currLand, setCurrLand] = useState<Land>("Island");
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const [currScreen, setCurrScreen] = useState<"map" | "dict">("map")

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
        <div className="left-controller w-36 h-full bg-nintendo-red p-4 flex items-center justify-center">
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className='absolute z-10 top-4'>
            <h1 className='font-mono font-bold text-gray-200 text-4xl'>{currLand}-{currChapter}</h1>
          </div>
          <div className="relative w-full h-full max-w-6xl max-h-128 overflow-hidden bg-foggy-gray pl-4 pr-4 pt-16 pb-16">
            {currScreen === 'dict' ? <Dictionary /> : <GameMap gameMapManager={gameMapManager} />}
          </div>
        </div>
        <div className="right-controller w-36 h-full bg-nintendo-blue p-4 flex flex-col items-center justify-center">
          <button
            onClick={addMiniGameMarker}
            className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-300 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
          <button
            onClick={openPopout}
            className="absolute top-4 right-20 p-2 bg-yellow-500 hover:bg-yellow-300 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
          <button
            onClick={saveMarkers}
            className="absolute top-20 right-20 p-2 bg-green-500 hover:bg-green-300 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faSave} size="lg" />
          </button>
          <button
            onClick={clearMarkers}
            className="absolute top-20 right-4 p-2 bg-green-500 hover:bg-green-300 text-white z-10 rounded-full w-12 h-12"
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </button>
          <button
            className="absolute top-36 right-4 p-2 bg-blue-500 hover:bg-blue-300 text-white z-10 rounded-full w-12 h-12"
            title='Dictionary'
            onClick={() => setCurrScreen(currScreen => (currScreen === 'dict' ? 'map' : 'dict'))}
          >
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
          <button
            className="absolute top-36 right-20 p-2 bg-blue-500 hover:bg-blue-300 text-white z-10 rounded-full w-12 h-12"
            title='Practice'
            onClick={() => alert("practice mode not done yet")}
          >
            <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
