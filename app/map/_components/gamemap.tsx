import React, { useState } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MiniGameMarker from './marker/minigamemarker';
import MapComponent from './mapcomponent';
import { selectRandomGame } from '../helpers/selectgame';
import { IntRange } from 'type-fest'; //for chapter
import ChapterMarker from './marker/chapmarker';

type LatLngBounds = [[number, number], [number, number]];

type GameMapProps = {
  markerPositions: { x: number, y: number }[];
  onMarkerDrag: (index: number, position: { x: number, y: number }) => void;
}

type Chapter = IntRange<1, 4>
// temperary array for now
const chapMaps: readonly ("map.png")[] = ["map.png", "map.png", "map.png", "map.png"];

const GameMap: React.FC<GameMapProps> = ({ markerPositions, onMarkerDrag }) => {
  const bounds: LatLngBounds = [
    [0, 0],
    [1000, 1000],
  ]; // Define bounds according to your image dimensions

  const handleMarkerDrag = (index: number, position: { x: number, y: number }) => {
    onMarkerDrag(index, position);
  };

  const [chapter, setChapter] = useState<Chapter>(1);
  const [mapPath, setMapPath] = useState<string>(chapMaps[chapter]);
  
  return (
    <div className="relative w-full h-full overflow-hidden no-select">
      <MapContainer
        center={[500, 500]}
        zoom={1}
        className="w-full h-full"
        crs={L.CRS.Simple} // Use Simple CRS for flat images
        maxBounds={bounds}
        maxBoundsViscosity={1.0} // Ensure the map stays within bounds
      >
        <MapComponent bounds={bounds} />
        <ImageOverlay
          url={`/${mapPath}`} 
          bounds={bounds}
        />
        {markerPositions.map((position, index) => (
          <MiniGameMarker
            key={index}
            location={position}
            onDragEnd={(newPosition) => handleMarkerDrag(index, newPosition)}
            selectGame={selectRandomGame}
          />
        ))}
        <ChapterMarker 
          location={{x: 260, y: 750}} 
          setMapPath={setMapPath}
          />
      </MapContainer>
    </div>
  );
};

export default GameMap;
