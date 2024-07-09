import React from 'react';
import useHighlightStyle from '../helpers/gamehighlight';

type HighlightCirclesProps = {
  locations: number[][];
  radius: number;
};

const HighlightCircles: React.FC<HighlightCirclesProps> = ({ locations, radius }) => {
  const highlightStyles = useHighlightStyle(locations, radius);

  return (
    <div style={{ position: 'relative' }}>
      {locations.map((_, index) => {
        const areaId = `minigame${index}`;
        return <div className="highlight-circle" key={areaId} id={areaId} style={highlightStyles[areaId]} />;
      })}
    </div>
  );
};

export default HighlightCircles;
