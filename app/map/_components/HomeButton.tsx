import React, { useContext, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";

// Custom component to add a home button to the Leaflet map
const HomeButton: React.FC = () => {
  const map = useMap();
  const { setGamePosition, setCurrBranch } = useContext(GamePositionContext);

  useEffect(() => {
    // Create a custom control
    const HomeControl = L.Control.extend({
      options: {
        position: "topleft",
      },

      onAdd: function () {
        const container = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control"
        );
        const button = L.DomUtil.create("a", "home-button", container);

        button.innerHTML = "🏠";
        button.title = "Return to Main Map";
        button.href = "#";
        button.style.fontSize = "16px";
        button.style.width = "30px";
        button.style.height = "30px";
        button.style.lineHeight = "30px";
        button.style.textAlign = "center";
        button.style.fontWeight = "bold";
        button.style.display = "block";
        button.style.backgroundColor = "white";

        L.DomEvent.on(button, "click", function (e) {
          L.DomEvent.preventDefault(e);

          // Reset game position to branch 0
          setGamePosition({
            branch_no: 0,
            chapter_no: 0,
            level_no: 0,
          });

          setCurrBranch(0);
        });

        return container;
      },
    });

    // Add the control to the map
    const homeControl = new HomeControl();
    map.addControl(homeControl);

    // Cleanup on unmount
    return () => {
      map.removeControl(homeControl);
    };
  }, [map, setGamePosition, setCurrBranch]);

  return null;
};

export default HomeButton;
