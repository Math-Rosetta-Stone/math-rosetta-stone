'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useHighlightStyle from './helpers/gamehighlight';
import selectRamdomGame from './helpers/selectgame';
import './map.css';

const Map: React.FC = () => {
  const router = useRouter();
  const areaIds = ['minigame1', 'minigame2', 'minigame3'];
  const highlightStyles = useHighlightStyle(areaIds);

  // prevent drag for the map
  useEffect(() => {
    const preventDefault = (e: DragEvent) => e.preventDefault();

    const mapImage = document.querySelector<HTMLImageElement>('.map-image');
    if (mapImage) {
      mapImage.addEventListener('dragstart', preventDefault);
    }

    return () => {
      if (mapImage) {
        mapImage.removeEventListener('dragstart', preventDefault);
      }
    };
  }, []);

  return (
    <div className="map-container">
      <img
        src='/map.png'
        alt="Game Map"
        className="map-image"
        useMap="#game-map"
      />
      {Object.keys(highlightStyles).map(areaId => (
        <div
          key={areaId}
          className="map-highlight"
          style={highlightStyles[areaId]}
        />
      ))}
      <map name="game-map">
        <area
          id="minigame1"
          shape="circle"
          coords="415,310,35"
          alt="MiniGame1"
          onClick={() => selectRamdomGame(router)}
        />
        <area
          id="minigame2"
          shape="circle"
          coords="535,490,35"
          alt="MiniGame2"
          onClick={() => selectRamdomGame(router)}
        />
        <area
          id="minigame3"
          shape="circle"
          coords="780,445,35"
          alt="MiniGame3"
          onClick={() => selectRamdomGame(router)}
        />
      </map>
    </div>
  );
};

export default Map;
