import { parseTerms } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useGameLevel } from "@/app/contexts/gamelevel/GameLevelContext";

/**
 * Hook to fetch terms for a specific branch, chapter, and level.
 * Uses GameLevelContext to get the current game level parameters.
 * 
 * @param params - Optional parameters. If not provided, uses context values.
 * @returns Terms data, loading state, and error
 */
export const useTermsForLevel = (params?: {
  branchNo?: number;
  chapterNo?: number;
  levelNo?: number;
}) => {
  // Try to get from context first, fall back to params
  let branchNo: number;
  let chapterNo: number;
  let levelNo: number;

  try {
    const context = useGameLevel();
    branchNo = params?.branchNo ?? context.branchNo;
    chapterNo = params?.chapterNo ?? context.chapterNo;
    levelNo = params?.levelNo ?? context.levelNo;
    console.log(branchNo, chapterNo, levelNo);
  } catch {
    // Context not available, must use params
    if (!params?.branchNo || !params?.chapterNo || !params?.levelNo) {
      throw new Error(
        "useTermsForLevel requires either GameLevelContext or explicit parameters"
      );
    }
    branchNo = params.branchNo;
    chapterNo = params.chapterNo;
    levelNo = params.levelNo;
    console.log(branchNo, chapterNo, levelNo);
  }

  const getTerms = async () => {
    const response = await fetch(
      `/api/terms?branch=${branchNo}&chapter=${chapterNo}&level=${levelNo}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch terms");
    }
    const data = await response.json();
    return data.data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["terms", branchNo, chapterNo, levelNo],
    queryFn: getTerms,
    enabled: !!branchNo && !!chapterNo && !!levelNo,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data ? parseTerms(data) : [],
    isPending,
    error,
  };
};

