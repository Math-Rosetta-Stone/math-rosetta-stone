"use client"

import { createContext, ReactNode, useState, useContext } from "react"
import { GamePosition } from "@/types/db"
import { useRouter } from "next/navigation"

interface PermissionContextProps {
  permissions: GamePosition[]
  fetchPermissions: () => Promise<void>
  updatePermissions: (newPermission: GamePosition) => void
}

const initialPermission = [
  { branch_no: 1, chapter_no: 1, level_no: 1 },
  { branch_no: 2, chapter_no: 1, level_no: 1 },
  { branch_no: 3, chapter_no: 1, level_no: 1 },
  { branch_no: 4, chapter_no: 1, level_no: 1 },
  { branch_no: 5, chapter_no: 1, level_no: 1 },
  { branch_no: 6, chapter_no: 1, level_no: 1 },
  { branch_no: 7, chapter_no: 1, level_no: 1 },
]

const PermissionContext = createContext<PermissionContextProps>({
  permissions: initialPermission,
  fetchPermissions: async () => {},
  updatePermissions: () => {},
})

const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [permissions, setPermissions] = useState<GamePosition[]>(initialPermission)

  const fetchPermissions = async () => {
    try {
      const response = await fetch("/api/permission")

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("User is not authorized. Redirecting to login...")
          router.push("/")
        } else {
          const errorData = await response.json()
          console.error("Failed to fetch permissions:", errorData.error || "Unknown error")
        }
        return
      }

      const data = await response.json()

      if (!data || !data.payload) {
        console.error("Invalid response structure:", data)
        return
      }

      const fetchedPermission = data.payload
      setPermissions(prevState => {
        const updated = [...prevState]
        const index = prevState.findIndex(permission => permission.branch_no === fetchedPermission.branch_no)

        if (index >= 0) {
          updated[index] = { ...updated[index], ...fetchedPermission }
        } else {
          updated.push(fetchedPermission)
        }

        return updated
      })
    } catch (error) {
      console.error("Error fetching permissions:", error)
      router.push("/")
    }
  }

  const updatePermissions = (newPermission: GamePosition) => {
    setPermissions(prevState =>
      prevState.map(permission => (permission.branch_no === newPermission.branch_no ? { ...permission, ...newPermission } : permission))
    )
  }

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        fetchPermissions,
        updatePermissions,
      }}>
      {children}
    </PermissionContext.Provider>
  )
}

export { PermissionProvider, PermissionContext }
