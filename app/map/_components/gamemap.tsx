import React, { useContext, useEffect, useState } from "react"
import { MapContainer, ImageOverlay } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import MiniGameMarker from "./marker/minigamemarker"
import MapComponent from "./mapcomponent"

import { MAP_BOUNDS } from "../constants"
import { Level } from "@/types/db"
import { MapContext } from "@/app/contexts/mapproviders"

const GameMap: React.FC = () => {
  const { currMapPath } = useContext(MapContext)
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
        {levels.map((level, index) => (
          <MiniGameMarker key={index} level={level} />
        ))}
      </MapContainer>
    </div>
  )
}

export default GameMap
