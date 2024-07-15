import React, { useEffect } from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MiniGameMarker from './minigame';
import { selectRandomGame } from '../helpers/selectgame';
import L from 'leaflet';

type LatLngBounds = [[number, number], [number, number]];

interface MapComponentProps {
  bounds: LatLngBounds;
}

const MapComponent: React.FC<MapComponentProps> = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();

      // Calculate the minimum zoom level to fit the map
      const containerWidth = map.getSize().x;
      const containerHeight = map.getSize().y;
      const mapWidth = bounds[1][1] - bounds[0][1];
      const mapHeight = bounds[1][0] - bounds[0][0];

      const widthScale = containerWidth / mapWidth;
      const heightScale = containerHeight / mapHeight;
      const newMinZoom = Math.log2(Math.max(widthScale, heightScale));

      map.setMinZoom(newMinZoom);
      map.fitBounds(bounds);

      // Set max bounds to prevent dragging outside
      map.setMaxBounds(bounds);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, bounds]);

  return null;
};

const GameMap: React.FC = () => {
  const bounds: LatLngBounds = [
    [0, 0],
    [1000, 1000],
  ]; // Define bounds according to your image dimensions

  const locations: { x: number, y: number }[] = [
    { x: 193, y: 29 },
    { x: -133, y: 100}
  ];

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
        {locations.map((location, index) => (
          <MiniGameMarker
            key={index}
            location={location}
            selectGame={selectRandomGame}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default GameMap;
