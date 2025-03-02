import React, { useContext, useEffect, useRef, useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MiniGameMarker from "./marker/minigamemarker";
import { MapMarker } from "./marker/mapmarker";
import MapComponent from "./mapcomponent";

import { MAP_BOUNDS, BRANCH_MAPS_PATHS } from "../constants";
import MAP_LOCATIONS from "../constants/mapLocation.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SelectLevel } from "@/app/db/schema";
import { useUser } from "@/app/hook/useUser";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { useGameData } from "@/app/hook/useGameData";
const GameMap: React.FC = () => {
  const { currBranch, gamePosition } = useContext(GamePositionContext);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { levels } = useGameData();
  // force rerender when currBranch changes
  const [imageOverlayKey, setImageOverlayKey] = useState(currBranch); // 0 to 7

  useEffect(() => {
    console.log("current game position", gamePosition);
  }, [gamePosition]);
  // Force rerender when currBranch changes
  useEffect(() => {
    // This will trigger a rerender of the ImageOverlay
    queryClient.invalidateQueries({ queryKey: ["currBranch"] });
  }, [currBranch, queryClient]);

  // Initial data setup
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch branches if not in cache
        if (!queryClient.getQueryData(["branches", user?.id])) {
          const branchesRes = await fetch("/api/branches");
          const branches = await branchesRes.json();
          queryClient.setQueryData(["branches", user?.id], branches.payload);
        }

        // Fetch chapters if not in cache
        if (!queryClient.getQueryData(["chapters", user?.id])) {
          const chaptersRes = await fetch("/api/chapters");
          const chapters = await chaptersRes.json();
          queryClient.setQueryData(["chapters", user?.id], chapters.payload);
        }

        // Fetch initial levels if needed
        if (
          currBranch !== 0 &&
          !queryClient.getQueryData([
            "levels",
            currBranch,
            gamePosition?.[currBranch]?.chapter_no,
          ])
        ) {
          const levelsRes = await fetch("/api/levels", {
            method: "POST",
            body: JSON.stringify({
              branchNo: currBranch,
              chapterNo: gamePosition?.[currBranch]?.chapter_no ?? 1,
            }),
          });
          const levels = await levelsRes.json();
          queryClient.setQueryData(
            ["levels", currBranch, gamePosition?.[currBranch]?.chapter_no],
            levels.payload
          );
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    if (user) {
      initializeData();
    }
    console.log(currBranch);
  }, [user, currBranch, gamePosition, queryClient]);

  useEffect(() => {
    console.log("currBranch", currBranch);
    console.log("levels", levels);
    console.log("gamePosition", gamePosition);
  }, [levels]);

  return (
    <div className="relative w-full h-full overflow-hidden no-select">
      <MapContainer
        center={[500, 500]}
        zoom={1}
        className="w-full h-full"
        crs={L.CRS.Simple} // Use Simple CRS for flat images
        maxBounds={MAP_BOUNDS}
        maxBoundsViscosity={1.0} // Ensure the map stays within bounds
      >
        <MapComponent bounds={MAP_BOUNDS} />
        <ImageOverlay
          key={imageOverlayKey}
          url={`/${BRANCH_MAPS_PATHS[currBranch]}`}
          bounds={MAP_BOUNDS}
        />
        {currBranch === 0 && (
          <>
            <MapMarker
              location={MAP_LOCATIONS[0][0]}
              targetBranch={1}
              targetChapter={1}
              queryClient={queryClient}
              setImageOverlayKey={setImageOverlayKey}
            />
            <MapMarker
              location={MAP_LOCATIONS[0][1]}
              targetBranch={2}
              targetChapter={1}
              queryClient={queryClient}
              setImageOverlayKey={setImageOverlayKey}
            />
            <MapMarker
              location={MAP_LOCATIONS[0][2]}
              targetBranch={3}
              targetChapter={1}
              queryClient={queryClient}
              setImageOverlayKey={setImageOverlayKey}
            />
            <MapMarker
              location={MAP_LOCATIONS[0][3]}
              targetBranch={4}
              targetChapter={1}
              queryClient={queryClient}
              setImageOverlayKey={setImageOverlayKey}
            />
          </>
        )}
        {/* {currBranch !== 0 &&
          gamePosition[currBranch]?.chapter_no > 0 &&
          levels &&
          levels.map(level => (
            <MiniGameMarker key={level.level_no} level={level} />
          ))} */}
      </MapContainer>
    </div>
  );
};

export default GameMap;
