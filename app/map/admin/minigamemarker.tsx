import React from "react"
import { Marker } from "react-leaflet"
import { useRouter } from "next/navigation"
import { DivIcon, LatLngExpression } from "leaflet"
import { selectRandomGame } from "../helpers/selectgame"
import { Position } from "@/types/map"
import { GameAndRandom } from "@/types/map"

interface MiniGameMarkerProps {
  location: Position
  onDragEnd: (position: Position) => void
  targetGame: GameAndRandom
}

const MiniGameMarker: React.FC<MiniGameMarkerProps> = ({ location, onDragEnd, targetGame }) => {
  const router = useRouter()

  const handleDragEnd = (e: L.DragEndEvent) => {
    const newLatLng = e.target.getLatLng()
    onDragEnd({ x: newLatLng.lng, y: newLatLng.lat })
  }

  const handleClick = () => {
    if (targetGame === "random") {
      const gameName = selectRandomGame()
      router.push(`/game/${gameName}`)
    } else {
      router.push(`/game/${targetGame}`)
    }
  }

  const icon = new DivIcon({
    className: "custom-div-icon",
    html: `<div class="custom-marker" style="background-color: red; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
  })

  const position: LatLngExpression = [location.y, location.x]

  return (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      eventHandlers={{
        dragend: handleDragEnd,
        click: handleClick,
      }}
    />
  )
}

export default MiniGameMarker
