import React from 'react';
import { Marker, useMap } from 'react-leaflet';
import { useRouter } from 'next/navigation';
import { DivIcon } from 'leaflet';
import { SelectGameMethod } from '../helpers/selectgame';

interface MiniGameMarkerProps {
  location: { x: number, y: number };
  selectGame: SelectGameMethod;
}

const MiniGameMarker: React.FC<MiniGameMarkerProps> = ({ location, selectGame }) => {
  const router = useRouter();
  const map = useMap();

  const link = () => {
    const gamename = selectGame();
    router.push("/" + gamename);
  };

  const icon = new DivIcon({
    className: 'custom-div-icon',
    html: `<div class="custom-marker" style="background-color: red; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
  });

  return (
    <Marker
      position={map.layerPointToLatLng([location.x, location.y])}
      icon={icon}
      eventHandlers={{
        click: link,
      }}
    />
  );
};

export default MiniGameMarker;
