import React, { useContext } from "react"
import { Marker } from "react-leaflet"
import { DivIcon, LatLngExpression } from "leaflet"
import { GameMapManager, Position, Land, Chapter } from "@/types/map"
import { LAND_MAPS_PATHS } from "../../constants"
import { MapContext } from "@/app/contexts/mapproviders"

interface MapMarkerProps {
  location: { x: number; y: number }
  targetLand: Land
  targetChapter: Chapter
}

export const MapMarker: React.FC<MapMarkerProps> = ({ location, targetChapter, targetLand }) => {
  const { setCurrChapter, setCurrLand, setCurrMapPath } = useContext(MapContext)
  const icon = new DivIcon({
    className: "custom-div-icon",
    html: `<div class="custom-marker" style="background-color: yellow; width: 50px; height: 50px; border-radius: 50%; cursor: pointer;"></div>`,
  })

  const position: LatLngExpression = [location.y, location.x]
  const handleClick = () => {
    setCurrChapter(targetChapter)
    setCurrLand(targetLand)
    setCurrMapPath(LAND_MAPS_PATHS[targetLand])
  }

  return (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      eventHandlers={{
        click: handleClick,
      }}
    />
  )
}
