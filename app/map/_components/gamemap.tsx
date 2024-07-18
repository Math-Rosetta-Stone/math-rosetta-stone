import React, { useState } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MiniGameMarker from './marker/minigamemarker';
import MapComponent from './mapcomponent';
import { selectRandomGame } from '../helpers/selectgame';

import { MapMarker } from './marker/mapmarker';
import { GameMapManager} from '../types'
import { MAP_BOUNDS, LAND_MAPS_PATHS } from '../constants'

type GameMapProps = {
  gameMapManager: GameMapManager
}

const GameMap: React.FC<GameMapProps> = ({ gameMapManager }) => {

  const [currMapPath, setCurrMapPath] = useState<string>(LAND_MAPS_PATHS[gameMapManager.currLand]);

  return (
    <div className="relative w-full h-full overflow-hidden no-select">
      <MapContainer
        center={[500, 500]}
        zoom={1}
        className="w-full h-full"
        crs={L.CRS.Simple} // Use Simple CRS for flat images
        maxBounds={MAP_BOUNDS}
        maxBoundsViscosity={1.0} // Ensure the map stays within bounds
      >
        <MapComponent bounds={MAP_BOUNDS} />
        <ImageOverlay
          url={`/${currMapPath}`}
          bounds={MAP_BOUNDS}
        />
        {gameMapManager.markers.map((marker, index) => (
          marker.type === "minigame" ? (
            <MiniGameMarker
              key={index}
              location={marker.position}
              onDragEnd={(newPosition) => gameMapManager.updateMarkers(index, newPosition)}
              selectGame={selectRandomGame}
            />
          ) : (
            <MapMarker
              key={index}
              location={marker.position}
              onDragEnd={(newPosition) => gameMapManager.updateMarkers(index, newPosition)}
              setMapPath={setCurrMapPath}
              gameMapManager={gameMapManager}
              targetChapter={marker.targetChapter}
              targetLand={marker.targetLand}
            />
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default GameMap;
