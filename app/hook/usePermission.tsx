import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { GamePosition } from "@/types/db"

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<GamePosition>({
    level_no: 1,
    chapter_no: 1,
    branch_no: 1,
  })
  const router = useRouter()

  useEffect(() => {
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

    fetchPermission()
  }, [router])

  return { permissions, setPermissions }
}
