import React, { useContext, useEffect, useState } from "react"
import { MapContainer, ImageOverlay } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import MiniGameMarker from "./marker/minigamemarker"
import { MapMarker } from "./marker/mapmarker"
import MapComponent from "./mapcomponent"

import { MAP_BOUNDS, Land_to_branch_no } from "../constants"
import { GamePosition, Level } from "@/types/db"
import { MapContext } from "@/app/contexts/mapproviders"
import { X } from "lucide-react"
import { PermissionContext } from "@/app/contexts/permissionproviders"
import { Land } from "@/types/map"

const locations = [
  { x: 430, y: 300 },
  { x: 250, y: 500 },
  { x: 700, y: 700 },
  { x: 500, y: 800 },
]

const GameMap: React.FC = () => {
  const { currLand, currMapPath } = useContext(MapContext)
  const [levels, setLevels] = useState<Level[]>([])

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
            branchNo: Land_to_branch_no[currLand],
          }),
        })
        const content = await rawResponse.json()
        setLevels(content.payload)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [currLand])

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
        {currLand === "InterMap" && (
          <>
            <MapMarker location={locations[0]} targetLand={"Island"} targetChapter={1} />
            <MapMarker location={locations[1]} targetLand={"Plain"} targetChapter={1} />
            <MapMarker location={locations[2]} targetLand={"Land1"} targetChapter={1} />
            <MapMarker location={locations[3]} targetLand={"Land2"} targetChapter={1} />
          </>
        )}
        {currLand !== "InterMap" && levels.map((level, index) => <MiniGameMarker key={index} level={level} />)}
      </MapContainer>
    </div>
  )
}

export default GameMap
