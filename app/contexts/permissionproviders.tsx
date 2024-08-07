"use client"

import { createContext, ReactNode, useState, useContext } from "react"
import { usePermissions } from "@/app/hook/usePermission"
import { GamePosition } from "@/types/db"

interface PermissionContextProps {
  permissions: GamePosition
  updatePermissions: (branch_no: number) => void
}

const PermissionContext = createContext<PermissionContextProps>({
  permissions: {
    branch_no: 1,
    chapter_no: 1,
    level_no: 1,
  },
  updatePermissions: () => {},
})

const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const { permissions, setPermissions } = usePermissions()

  const updatePermissions = (newPermissions: Partial<GamePosition>) => {
    setPermissions(prevState => ({
      ...prevState,
      ...newPermissions,
    }))
  }

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        updatePermissions,
      }}>
      {children}
    </PermissionContext.Provider>
  )
}

// Custom hook to use the PermissionContext
const usePermissionContext = () => {
  return useContext(PermissionContext)
}

export { PermissionProvider, usePermissionContext }
