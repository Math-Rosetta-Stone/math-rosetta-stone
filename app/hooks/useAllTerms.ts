import { useQuery } from "@tanstack/react-query";

export interface Term {
  term_id: number;
  term: string;
  branch_no: number;
  rank: number;
  definition: string;
  example: string;
}

export const useAllTerms = () => {
  const { data, isLoading, isError, refetch } = useQuery<Term[]>({
    queryKey: ["allTerms"],
    queryFn: async () => {
      const response = await fetch("/api/allTerms");
      if (!response.ok) {
        throw new Error(`Failed to fetch terms: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch terms");
      }
      return result.data;
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return {
    terms: data || [],
    isLoading,
    isError,
    refetch,
  };
};
