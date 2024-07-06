import { useEffect, useState } from 'react';

const useHighlightStyle = (areaId: string) => {
  const [highlightStyle, setHighlightStyle] = useState({});

  useEffect(() => {
    const areaElement = document.getElementById(areaId);
    if (areaElement) {
      const coords = areaElement.coords.split(',').map(coord => parseInt(coord, 10));
      const radius = coords[2];
      setHighlightStyle({
        left: `${coords[0] - radius}px`,
        top: `${coords[1] - radius}px`,
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
        borderRadius: '50%',
      });
    }
  }, [areaId]);

  return highlightStyle;
};

export default useHighlightStyle;
