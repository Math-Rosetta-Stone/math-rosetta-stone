import React from 'react';
import { Marker } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';

interface ChapMarkerProps {
    location: { x: number, y: number };
    setMapPath: (path: string) => void
}

const ChapterMarker: React.FC<ChapMarkerProps> = ({location, setMapPath}) => {
    const icon = new DivIcon({
        className: 'custom-div-icon',
        html: `<div class="custom-marker" style="background-color: yellow; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
    });

    const position: LatLngExpression = [location.y, location.x];

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
            }}
        />
    );
};

export default ChapterMarker;
