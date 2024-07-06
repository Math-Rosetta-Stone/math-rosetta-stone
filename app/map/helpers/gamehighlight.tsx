import { useEffect, useState } from 'react';

const useHighlightStyle = (areaIds: string[]) => {
  const [highlightStyles, setHighlightStyles] = useState<{ [key: string]: React.CSSProperties }>({});

  useEffect(() => {
    const newHighlightStyles: { [key: string]: React.CSSProperties } = {};

    areaIds.forEach(areaId => {
      const areaElement = document.getElementById(areaId);
      if (areaElement) {
        const coords = areaElement.coords.split(',').map(coord => parseInt(coord, 10));
        const radius = coords[2];
        newHighlightStyles[areaId] = {
          left: `${coords[0] - radius}px`,
          top: `${coords[1] - radius}px`,
          width: `${2 * radius}px`,
          height: `${2 * radius}px`,
          borderRadius: '50%',
          position: 'absolute',
        };
      }
    });

    // Only update the state if there are changes
    setHighlightStyles(prevStyles => {
      const hasChanges = areaIds.some(areaId => {
        const newStyle = newHighlightStyles[areaId];
        const prevStyle = prevStyles[areaId];
        if (!prevStyle) return true;
        return (
          newStyle.left !== prevStyle.left ||
          newStyle.top !== prevStyle.top ||
          newStyle.width !== prevStyle.width ||
          newStyle.height !== prevStyle.height ||
          newStyle.borderRadius !== prevStyle.borderRadius
        );
      });

      return hasChanges ? newHighlightStyles : prevStyles;
    });
  }, [areaIds]);

  return highlightStyles;
};

export default useHighlightStyle;
