import React from 'react';
import { Marker } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
import { GameMapManager, Position, Land, Chapter } from '../../types'
import { LAND_MAPS_PATHS } from '../../constants';

interface MapMarkerProps {
    location: { x: number, y: number };
    setMapPath: (path: string) => void;
    onDragEnd: (position: Position) => void;
    gameMapManager: GameMapManager;
    targetLand: Land;
    targetChapter: Chapter
}

export const MapMarker: React.FC<MapMarkerProps> = ({ location, setMapPath, onDragEnd, gameMapManager, targetChapter, targetLand }) => {
    const icon = new DivIcon({
        className: 'custom-div-icon',
        html: `<div class="custom-marker" style="background-color: yellow; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
    });

    const readMarkers = () => {
        const storedMarkers = localStorage.getItem(`${targetLand}${targetChapter}markers`);
        return storedMarkers ? JSON.parse(storedMarkers) : [];
    };

    const position: LatLngExpression = [location.y, location.x];
    const handleClick = () => {
        gameMapManager.setCurrChapter(targetChapter)
        gameMapManager.setCurrLand(targetLand)
        gameMapManager.setMarkers(readMarkers)
        setMapPath(LAND_MAPS_PATHS[targetLand])
    };

    const handleDragEnd = (e: L.DragEndEvent) => {
        const newLatLng = e.target.getLatLng();
        onDragEnd({ x: newLatLng.lng, y: newLatLng.lat });
    };

    return (
        <Marker
            position={position}
            icon={icon}
            draggable={true}
            eventHandlers={{
                click: handleClick,
                dragend: handleDragEnd,
            }}
        />
    );
};

