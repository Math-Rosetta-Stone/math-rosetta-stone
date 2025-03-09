import { useQuery } from "@tanstack/react-query";
import { SelectUser } from "@/app/db/schema";

interface UserResponse {
  user: SelectUser | null;
  error?: string;
}

const fetchUserData = async (): Promise<UserResponse> => {
  try {
    const res = await fetch("/api/user");

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await res.json();
    return { user: data.payload };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { user: null, error: "Failed to fetch user data" };
  }
};

export const useUser = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Don't refetch if we already have data
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    user: data?.user ?? null,
    isLoading,
    isError,
    error,
    refetch,
  };
};
