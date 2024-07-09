import { useEffect, useState } from 'react';

const useHighlightStyle = (locations: number[][], radius: number) => {
  const [highlightStyles, setHighlightStyles] = useState<{ [key: string]: React.CSSProperties }>({});

  useEffect(() => {
    const newHighlightStyles: { [key: string]: React.CSSProperties } = {};

    locations.forEach((location, index) => {
      const areaId = `minigame${index}`;
      newHighlightStyles[areaId] = {
        left: `${location[0] - radius}px`,
        top: `${location[1] - radius}px`,
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
        borderRadius: '50%',
        position: 'absolute',
      };
    });

    // Only update the state if there are changes
    setHighlightStyles(prevStyles => {
      const hasChanges = locations.some((_, index) => {
        const areaId = `minigame${index}`;
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
  }, [locations, radius]);

  return highlightStyles;
};

export default useHighlightStyle;

