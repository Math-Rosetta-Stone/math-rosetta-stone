import React, { useContext } from "react"
import { Marker } from "react-leaflet"
import { useRouter } from "next/navigation"
import { DivIcon, LatLngExpression } from "leaflet"
import { selectRandomGame } from "../../helpers/selectgame"
import { GamePosition, Level } from "@/types/db"
import { GamePositionContext } from "@/app/contexts/gamepositionproviders"
import { PermissionContext } from "@/app/contexts/permissionproviders"
import { MapContext } from "@/app/contexts/mapproviders"
import { Land_to_branch_no } from "../../constants"

interface MiniGameMarkerProps {
  level: Level
}

const MiniGameMarker: React.FC<MiniGameMarkerProps> = ({ level }) => {
  const router = useRouter()
  const { setGamePosition } = useContext(GamePositionContext)
  const { permissions } = useContext(PermissionContext)
  const { currLand, currChapter } = useContext(MapContext)

  const handleClick = () => {
    setGamePosition({ level_no: level.level_no, branch_no: level.branch_no, chapter_no: level.chapter_no })
    if (level.minigame_name === "random") {
      const gameName = selectRandomGame()
      router.push(`/game/${gameName}`)
    } else {
      router.push(`/game/${level.minigame_name}`)
    }
  }

  const have_permission = (permissions: GamePosition[], level: Level) => {
    console.log(permissions)
    const permission = permissions.filter(permission => permission.branch_no === Land_to_branch_no[currLand])[0]
    if (permission.chapter_no > currChapter || (permission.chapter_no === currChapter && permission.level_no > level.level_no)) return true
    return false
  }

  const iconColor = have_permission(permissions, level) ? "green" : "red"

  const icon = new DivIcon({
    className: "custom-div-icon",
    html: `<div class="custom-marker" style="background-color: ${iconColor}; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"></div>`,
  })

  const position: LatLngExpression = [level.y, level.x]

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  )
}

export default MiniGameMarker
