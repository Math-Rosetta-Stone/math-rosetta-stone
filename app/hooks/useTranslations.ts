import { useQuery } from "@tanstack/react-query";

export interface Translation {
  term: string;
  translation: string;
}

export const useTranslations = (language: string) => {
  const { data, isLoading, isError, refetch } = useQuery<Translation[]>({
    queryKey: ["translations", language],
    queryFn: async () => {
      if (!language) {
        throw new Error("Language is required to fetch translations");
      }

      const response = await fetch(`/api/translations?language=${language}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch translations: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch translations");
      }

      return result.data;
    },
    enabled: !!language, // Only fetch if language is provided
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return {
    translations: data || [],
    isLoading,
    isError,
    refetch,
  };
};
