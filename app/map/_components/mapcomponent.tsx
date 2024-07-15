import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type LatLngBounds = [[number, number], [number, number]];

const MapComponent: React.FC<{ bounds: LatLngBounds }> = ({ bounds }) => {
  const map = useMap();

  const fitMapToBounds = () => {
    map.fitBounds(bounds);

    const containerWidth = map.getSize().x;
    const containerHeight = map.getSize().y;
    const mapWidth = bounds[1][1] - bounds[0][1];
    const mapHeight = bounds[1][0] - bounds[0][0];

    const widthScale = containerWidth / mapWidth;
    const heightScale = containerHeight / mapHeight;
    const scale = Math.min(widthScale, heightScale); // Use the smaller scale to fit the map within the container

    const newMinZoom = map.getScaleZoom(scale, map.getZoom());

    map.setMinZoom(newMinZoom);
    map.setZoom(newMinZoom);
  };

  useEffect(() => {
    fitMapToBounds();

    const handleResize = () => {
      map.invalidateSize();
      fitMapToBounds();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, bounds]);

  return null;
};

export default MapComponent;
