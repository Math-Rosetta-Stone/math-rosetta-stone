import React, { useEffect } from 'react';
import MiniGameArea from './minigame';
import { selectRandomGame } from '../helpers/selectgame';
import HighlightCircles from '../_components/highlightcircle';

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

    const locations: number[][] = [
        [415, 310], [535, 490], [780, 445]
    ];
    const radius = 35

    return (
        <div>
            <img
                src='/map.png'
                alt="Game Map"
                className="map-image"
                useMap="#game-map"
            />
            <map name="game-map">
                {locations.map((location, index) => (
                    <MiniGameArea
                        key={index}
                        location={location}
                        radius={radius}
                        selectGame={selectRandomGame}
                        index={index}
                    />
                ))}
            </map>
            <HighlightCircles locations={locations} radius={radius}/>
        </div>
    );
};

export default GameMap;
