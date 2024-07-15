import React, { useEffect, useRef, useState } from 'react';
import MiniGameArea from './minigame';
import { selectRandomGame } from '../helpers/selectgame';

const GameMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleResize = () => {
    if (mapRef.current && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const mapWidth = mapRef.current.scrollWidth;
      const mapHeight = mapRef.current.scrollHeight;

      // Calculate scale to fit the map within the container
      const widthScale = containerWidth / mapWidth;
      const heightScale = containerHeight / mapHeight;
      const newScale = Math.max(widthScale, heightScale);

      setMapDimensions({ width: mapWidth, height: mapHeight });
      setContainerDimensions({ width: containerWidth, height: containerHeight });
      setScale(newScale);

      // Adjust position to ensure it stays within the boundaries
      const minX = containerWidth - mapWidth * newScale;
      const minY = containerHeight - mapHeight * newScale;

      setPosition((prevPosition) => ({
        x: Math.max(Math.min(prevPosition.x, 0), minX),
        y: Math.max(Math.min(prevPosition.y, 0), minY),
      }));
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault(); // Prevent default behavior for text selection
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && mapRef.current && containerRef.current) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;

      // Calculate boundaries
      const minX = containerDimensions.width - mapDimensions.width * scale;
      const minY = containerDimensions.height - mapDimensions.height * scale;

      // Ensure the map stays within boundaries
      setPosition({
        x: Math.max(Math.min(newX, 0), minX),
        y: Math.max(Math.min(newY, 0), minY),
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const getTransformOrigin = () => {
    const offsetX = (position.x / containerDimensions.width) * 100;
    const offsetY = (position.y / containerDimensions.height) * 100;
    return `${-offsetX}% ${-offsetY}%`;
  };

  const locations: { x: number, y: number }[] = [
    { x: 26.6, y: 26 },
    { x: 34.2, y: 41 },
  ];

  const radius = 2.1; // Use percentage-based radius

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden no-select"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={mapRef}
        className="absolute"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: getTransformOrigin(),
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
      >
        <img
          src="/map.png"
          alt="Game Map"
          className="w-full h-auto object-cover"
          onMouseDown={(e) => e.preventDefault()} // Prevent default image drag behavior
        />
        <svg className="absolute top-0 left-0 w-full h-full">
          {locations.map((location, index) => (
            <MiniGameArea
              key={index}
              location={location}
              radius={radius}
              selectGame={selectRandomGame}
              index={index}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default GameMap;
