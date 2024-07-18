import React, { useState } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MiniGameMarker from './marker/minigamemarker';
import MapComponent from './mapcomponent';
import { selectRandomGame } from '../helpers/selectgame';
import { IntRange } from 'type-fest'; //for chapter
import MapMarker from './marker/mapmarker';
import { Marker, Position } from '../types'

type LatLngBounds = [[number, number], [number, number]];

type GameMapProps = {
  markers: Marker[];
  onMarkerDrag: (index: number, position: { x: number, y: number }) => void;
}

type Chapter = IntRange<1, 4>
// temperary array for now
const chapMaps: readonly ("map.png")[] = ["map.png", "map.png", "map.png", "map.png"];

const GameMap: React.FC<GameMapProps> = ({ markers, onMarkerDrag }) => {
  const bounds: LatLngBounds = [
    [0, 0],
    [1000, 1000],
  ]; // Define bounds according to your image dimensions

  const handleMarkerDrag = (index: number, position: Position) => {
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
        {markers.map((marker, index) => (
          marker.type === "minigame" ? (
            <MiniGameMarker
              key={index}
              location={marker.position}
              onDragEnd={(newPosition) => handleMarkerDrag(index, newPosition)}
              selectGame={selectRandomGame}
            />
          ) : (
            <MapMarker
              key={index}
              location={marker.position}
              onDragEnd={(newPosition) => handleMarkerDrag(index, newPosition)}
              setMapPath={setMapPath}
            />
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default GameMap;
