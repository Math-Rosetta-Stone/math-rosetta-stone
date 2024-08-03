"use client"
import { Chapter, Land } from "@/types/map"
import { createContext, useState, ReactNode } from "react"
import { LAND_MAPS_PATHS } from "../map/constants"

interface MapContextProps {
  currLand: Land
  currChapter: Chapter
  currMapPath: string // Path to current map image (relative to /public/maps)
  setCurrLand: (land: Land) => void
  setCurrChapter: (chapter: Chapter) => void
  setCurrMapPath: (path: string) => void
}

const MapContext = createContext<MapContextProps>({
  currChapter: 1,
  currLand: "Island",
  currMapPath: LAND_MAPS_PATHS["Island"],
  setCurrLand: (land: Land) => {},
  setCurrChapter: (chapter: Chapter) => {},
  setCurrMapPath: (path: string) => {},
})

const MapProviders = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [currChapter, setCurrChapter] = useState<Chapter>(1)
  const [currLand, setCurrLand] = useState<Land>("Island")
  const [currMapPath, setCurrMapPath] = useState<string>(LAND_MAPS_PATHS[currLand])

  return (
    <MapContext.Provider
      value={{
        currChapter,
        currLand,
        currMapPath,
        setCurrLand,
        setCurrChapter,
        setCurrMapPath,
      }}>
      {children}
    </MapContext.Provider>
  )
}

export { MapProviders, MapContext }
