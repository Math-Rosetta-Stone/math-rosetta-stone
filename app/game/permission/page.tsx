"use client"

import { useRouter } from "next/navigation"
import { PermissionContext } from "@/app/contexts/permissionproviders"
import { useContext, useEffect } from "react"
import { GamePositionContext } from "@/app/contexts/gamepositionproviders"
import LoadingAnimation from "@/components/ui/loadinganimation"

const PermissionPage = () => {
  const router = useRouter()
  const { gamePosition, setGamePosition } = useContext(GamePositionContext)
  const { permissions, updatePermissions } = useContext(PermissionContext)

  useEffect(() => {
    if (
      gamePosition &&
      permissions.some(
        permission =>
          permission.level_no === gamePosition.level_no &&
          permission.branch_no === gamePosition.branch_no &&
          permission.chapter_no === gamePosition.chapter_no
      )
    ) {
      const currentPermission = permissions.find(
        permission =>
          permission.level_no === gamePosition.level_no &&
          permission.branch_no === gamePosition.branch_no &&
          permission.chapter_no === gamePosition.chapter_no
      )

      if (!currentPermission) return

      const newGamePosition = {
        level_no: currentPermission.level_no + 1,
        branch_no: currentPermission.branch_no,
        chapter_no: currentPermission.chapter_no,
      }

      updatePermissions(newGamePosition)

      const updatePermissionDB = async () => {
        try {
          const response = await fetch(`/api/permission/${newGamePosition.branch_no}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              updatedChapterNo: newGamePosition.chapter_no,
              updatedLevelNo: newGamePosition.level_no,
            }),
          })

          if (!response.ok) {
            const data = await response.json()
            console.error("Error updating permission:", data.error || "Unknown error")
            return
          }

          const data = await response.json()
          updatePermissions(data.payload)
          console.log("Updated permissions:", permissions)
        } catch (error) {
          console.error("Failed to update permissions:", error)
        }
      }

      setGamePosition(null)
      updatePermissionDB()
      router.push("/map")
    }
  }, [gamePosition, permissions, setGamePosition, updatePermissions])

  return <LoadingAnimation />
}

export default PermissionPage
