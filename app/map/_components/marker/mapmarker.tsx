import React from 'react';
import { Marker } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
import { GameMapManager, Position } from '../../types'

interface MapMarkerProps {
    location: { x: number, y: number };
    setMapPath: (path: string) => void
    onDragEnd: (position: Position) => void;
    gameMapManager: GameMapManager
}

const MapMarker: React.FC<MapMarkerProps> = ({location, setMapPath, onDragEnd, gameMapManager}) => {
    const icon = new DivIcon({
        className: 'custom-div-icon',
        html: `<div class="custom-marker" style="background-color: yellow; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
    });

    const position: LatLngExpression = [location.y, location.x];

    const handleDragEnd = (e: L.DragEndEvent) => {
        const newLatLng = e.target.getLatLng();
        onDragEnd({ x: newLatLng.lng, y: newLatLng.lat });
      };

    const handleClick = () => {
        setMapPath("intermap.png")
    };

    return (
        <Marker
            position={position}
            icon={icon}
            draggable={true}
            eventHandlers={{
                click: handleClick ,
                dragend: handleDragEnd,
            }}
        />
    );
};

export default MapMarker;
