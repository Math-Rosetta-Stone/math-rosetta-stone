import React from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MiniGameMarker from './minigame';
import MapComponent from './mapcomponent';
import { selectRandomGame } from '../helpers/selectgame';

type LatLngBounds = [[number, number], [number, number]];

interface GameMapProps {
  markerPositions: { x: number, y: number }[];
  onMarkerDrag: (index: number, position: { x: number, y: number }) => void;
}

const GameMap: React.FC<GameMapProps> = ({ markerPositions, onMarkerDrag }) => {
  const bounds: LatLngBounds = [
    [0, 0],
    [1000, 1000],
  ]; // Define bounds according to your image dimensions

  const handleMarkerDrag = (index: number, position: { x: number, y: number }) => {
    onMarkerDrag(index, position);
  };

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
          url="/map.png" // Use the custom map image path
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
      </MapContainer>
    </div>
  );
};

export default GameMap;
