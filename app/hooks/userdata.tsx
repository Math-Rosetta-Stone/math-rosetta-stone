import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export const useUserData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user")
        if (res.status === 401) {
          router.push("/")
        } else if (!res.ok) {
          throw new Error("Failed to fetch user data")
        }
        await res.json()
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false) // To prevent endless loading in case of an error
      }
    }

    fetchUserData()
  }, [router])

  return { isLoading }
}
