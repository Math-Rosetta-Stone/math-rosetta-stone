import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SelectBranch, SelectChapter, SelectLevel } from "@/app/db/schema";
import { useUser } from "./useUser";

// Cache time constants
const CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useGameData = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  // Fetch branches
  const { data: branches } = useQuery<SelectBranch[]>({
    queryKey: ["branches"],
    queryFn: async () => {
      const res = await fetch("/api/branches");
      const data = await res.json();
      return data.payload;
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!user,
  });

  // Fetch chapters
  const { data: chapters } = useQuery<SelectChapter[]>({
    queryKey: ["chapters"],
    queryFn: async () => {
      const res = await fetch("/api/chapters");
      const data = await res.json();
      return data.payload;
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!user,
  });

  const { data: levels } = useQuery<SelectLevel[]>({
    queryKey: ["levels"],
    queryFn: async () => {
      const res = await fetch("/api/levels");
      const data = await res.json();
      return data.payload;
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!user,
  });

  // Function to force refresh data
  const refreshGameData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["branches"] }),
      queryClient.invalidateQueries({ queryKey: ["chapters"] }),
      queryClient.invalidateQueries({ queryKey: ["levels"] }),
    ]);
  };

  return {
    branches,
    chapters,
    levels,
    refreshGameData,
  };
};
