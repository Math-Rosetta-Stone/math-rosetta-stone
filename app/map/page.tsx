'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './map.css';

const Map: React.FC = () => {
  const router = useRouter();

  return (
    <div className="mapContainer">
      <img
        src='../../public/map.jpg'
        alt="Game Map"
        className="mapImage"
        useMap="#game-map"
      />
      <map name="game-map">
        <area
          shape="rect"
          coords="34,44,270,350"
          alt="MiniGame1"
          onClick={() => router.push('/Hangman')}
        />
        <area
          shape="rect"
          coords="290,172,333,250"
          alt="MiniGame2"
          onClick={() => router.push('/MatchingGame')}
        />
        {/* Add more areas as needed */}
      </map>
    </div>
  );
};

export default Map;
