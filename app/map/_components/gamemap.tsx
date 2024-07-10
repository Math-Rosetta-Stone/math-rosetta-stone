import React, { useEffect } from 'react';
import MiniGameArea from './minigame';
import { selectRandomGame } from '../helpers/selectgame';

const GameMap: React.FC = () => {
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

    // relative percentage of the map
    const locations: { x: number, y: number }[] = [
        { x: 26.6, y: 26 }, 
        { x: 34.2, y: 41 }  
    ];

    const radius = 2.1; // Use percentage-based radius

    return (
        <div className='relative'>
            <img
                src='/map.png'
                alt="Game Map"
                className="map-image w-full"
            />
            <svg className='absolute top-0 left-0 w-full h-full'>
                {locations.map((location, index) => (
                    <MiniGameArea
                        key={index}
                        location={location}
                        radius={radius}
                        selectGame={selectRandomGame}
                        index={index}
                    />
                ))}
            </svg>
        </div>
    );
};

export default GameMap;
