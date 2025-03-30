import { useQuery } from "@tanstack/react-query";

export interface Language {
  id: number;
  name: string;
}

export const useLanguages = () => {
  const { data, isLoading, isError, refetch } = useQuery<Language[]>({
    queryKey: ["languages"],
    queryFn: async () => {
      const response = await fetch("/api/languages");
      if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch languages");
      }
      return result.data;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return {
    languages: data || [],
    isLoading,
    isError,
    refetch,
  };
};
