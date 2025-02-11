import { useQuery } from "@tanstack/react-query"
import { SelectUser } from "@/app/db/schema"

interface UserResponse {
  user: SelectUser | null
  error?: string
}

const fetchUserData = async (): Promise<UserResponse> => {
  try {
    const res = await fetch("/api/users")

    if (!res.ok) {
      throw new Error("Failed to fetch user data")
    }

    const data = await res.json()
    return { user: data }
  } catch (error) {
    console.error("Error fetching user:", error)
    return { user: null, error: "Failed to fetch user data" }
  }
}

export const useUser = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    retry: 2, // Retry failed requests twice
  })

  return {
    user: data?.user ?? null,
    isLoading,
    isError,
    error,
    refetch,
  }
}
