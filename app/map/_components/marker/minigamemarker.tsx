import React from 'react';
import { Marker } from 'react-leaflet';
import { useRouter } from 'next/navigation';
import { DivIcon, LatLngExpression } from 'leaflet';
import { SelectGameMethod } from '../../helpers/selectgame';

interface MiniGameMarkerProps {
  location: { x: number, y: number };
  onDragEnd: (position: { x: number, y: number }) => void;
  selectGame: SelectGameMethod;
}

const MiniGameMarker: React.FC<MiniGameMarkerProps> = ({ location, onDragEnd, selectGame }) => {
  const router = useRouter();

  const handleDragEnd = (e: L.DragEndEvent) => {
    const newLatLng = e.target.getLatLng();
    onDragEnd({ x: newLatLng.lng, y: newLatLng.lat });
  };

  const handleClick = () => {
    const gameName = selectGame();
    router.push(`/${gameName}`);
  };

  const icon = new DivIcon({
    className: 'custom-div-icon',
    html: `<div class="custom-marker" style="background-color: red; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
  });

  const position: LatLngExpression = [location.y, location.x];

  return (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      eventHandlers={{
        dragend: handleDragEnd,
        click: handleClick,
      }}
    />
  );
};

export default MiniGameMarker;
