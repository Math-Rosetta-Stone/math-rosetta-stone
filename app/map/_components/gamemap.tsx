import React, { useEffect, useState } from "react"
import { MapContainer, ImageOverlay } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import MiniGameMarker from "./marker/minigamemarker"
import MapComponent from "./mapcomponent"
import { selectRandomGame } from "../helpers/selectgame"

import { MapMarker } from "./marker/mapmarker"
import { GameMapManager } from "@/types/map"
import { MAP_BOUNDS, LAND_MAPS_PATHS } from "../constants"
import { Level } from "@/types/db"

type GameMapProps = {
  gameMapManager: GameMapManager
}

const GameMap: React.FC<GameMapProps> = ({ gameMapManager }) => {
  const [currMapPath, setCurrMapPath] = useState<string>(LAND_MAPS_PATHS[gameMapManager.currLand])
  const [levels, setLevels] = useState<Level[]>([])

  //TODO: fetch call mini markers location
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResponse = await fetch("/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chapterNo: 1,
            branchNo: 1,
          }),
        })
        const content = await rawResponse.json()
        console.log(content)
        setLevels(content.payload)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

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
        <ImageOverlay url={`/${currMapPath}`} bounds={MAP_BOUNDS} />
        {gameMapManager.markers.map((marker, index) =>
          marker.type === "minigame" ? (
            <MiniGameMarker
              key={index}
              location={marker.position}
              targetGame={marker.targetGame}
              onDragEnd={newPosition => gameMapManager.updateMarkers(index, newPosition)}
              selectGame={selectRandomGame}
            />
          ) : (
            <MapMarker
              key={index}
              location={marker.position}
              onDragEnd={newPosition => gameMapManager.updateMarkers(index, newPosition)}
              setMapPath={setCurrMapPath}
              gameMapManager={gameMapManager}
              targetChapter={marker.targetChapter}
              targetLand={marker.targetLand}
            />
          )
        )}
        {levels.map((level, index) => (
          <MiniGameMarker
            key={index}
            location={{ x: level.x, y: level.y }}
            targetGame={level.minigame_name}
            onDragEnd={newPosition => gameMapManager.updateMarkers(index, newPosition)}
            selectGame={selectRandomGame}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export default GameMap
