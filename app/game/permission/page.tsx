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
      gamePosition.level_no === permissions.level_no &&
      gamePosition.branch_no === permissions.branch_no &&
      gamePosition.chapter_no === permissions.chapter_no
    ) {
      const newGamePosition = {
        level_no: permissions.level_no + 1,
        branch_no: permissions.branch_no,
        chapter_no: permissions.chapter_no,
      }
      // TODO: need to update chapter if no more levels
      updatePermissions({ level_no: permissions.level_no + 1 })

      const updatePermissionDB = async () => {
        try {
          await fetch("/api/user", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newGamePosition),
          })
        } catch (error) {
          console.error("Error updating permissions in DB:", error)
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
