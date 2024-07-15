import { Bounds } from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type LatLngBounds = [[number, number], [number, number]];

const MapComponent: React.FC<{ bounds: LatLngBounds }> = ({ bounds }) => {
  const map = useMap();

  const handleResize = () => {
    map.invalidateSize();
      
    const containerWidth = map.getSize().x;
    const containerHeight = map.getSize().y;
    const mapWidth = bounds[1][1] - bounds[0][1];
    const mapHeight = bounds[1][0] - bounds[0][0];

    const widthScale = containerWidth / mapWidth;
    const heightScale = containerHeight / mapHeight;
    const newMinZoom = Math.log2(Math.max(widthScale, heightScale));

    map.setMinZoom(newMinZoom);
    map.fitBounds(bounds);

    map.setMaxBounds(bounds);
  };

  useEffect(() => {

    const initialSetZoom = () => {
      handleResize();
      map.setMaxZoom(2);
    };

    initialSetZoom();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, bounds]);

  return null;
};

export default MapComponent;
