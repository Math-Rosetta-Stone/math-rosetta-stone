"use client"

import { createContext, ReactNode, useState, useContext } from "react"
import { GamePosition } from "@/types/db"
import { useRouter } from "next/navigation"

interface PermissionContextProps {
  permissions: GamePosition
  updatePermissions: (newPermissions: Partial<GamePosition>) => void
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
  const router = useRouter()
  const [permissions, setPermissions] = useState<GamePosition>({
    branch_no: 1,
    chapter_no: 1,
    level_no: 1,
  })
  const fetchPermission = async () => {
    try {
      const res = await fetch("/api/user")
      if (res.status === 401) {
        router.push("/")
      } else if (!res.ok) {
        throw new Error("Failed to fetch user data")
      } else {
        const data = await res.json()
        setPermissions({ level_no: data.curr_level_no, chapter_no: data.curr_chapter_no, branch_no: data.curr_branch_no })
      }
    } catch (error) {
      console.error(error)
      router.push("/")
    }
  }

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

export { PermissionProvider, PermissionContext }
