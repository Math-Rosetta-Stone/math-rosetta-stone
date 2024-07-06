'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import useHighlightStyle from './helpers/gamehighlight';
import './map.css';

const Map: React.FC = () => {
  const router = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const highlightStyle = useHighlightStyle('minigame1');

  return (
    <div className="map-wrapper">
      <div className="map-container" ref={mapContainerRef}>
        <img
          src='/map.jpg'
          alt="Game Map"
          className="map-image"
          useMap="#game-map"
        />
        
        <div className="map-highlight" style={highlightStyle}></div>
        <map name="game-map">
          <area 
            id="minigame1"
            shape="circle"
            coords="150,200,50"  
            alt="MiniGame1"
            onClick={() => router.push('/hangman')}
          />
        </map>
      </div>
    </div>
  );
};

export default Map;
