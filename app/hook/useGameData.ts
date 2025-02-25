import { useQueryClient } from "@tanstack/react-query";
import { SelectBranch, SelectChapter, SelectLevel } from "@/app/db/schema";
import { useUser } from "./useUser";

// export const initGameData = async () => {
//   const queryClient = useQueryClient();
//   const { user } = useUser();

//   try {
//     const chapters: SelectChapter[] = await fetchChapterData();
//     const branches: SelectBranch[] = await fetchBranchData();
//     queryClient.setQueryData(["chapters", user?.id], chapters);
//     queryClient.setQueryData(["branches", user?.id], branches);
//   } catch (error) {
//     console.error("Error initializing chapters:", error);
//   }
// };

// const fetchChapterData = async (): Promise<SelectChapter[]> => {
//   const res = await fetch("/api/chapters");
//   if (!res.ok) {
//     throw new Error("Failed to fetch chapter data");
//   }
//   return res.json();
// };

// const fetchBranchData = async (): Promise<SelectBranch[]> => {
//   const res = await fetch("/api/branches");
//   if (!res.ok) {
//     throw new Error("Failed to fetch branch data");
//   }
//   return res.json();
// };

export const useGameData = async () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  let chapters = queryClient.getQueryData<SelectChapter[]>([
    "chapters",
    user?.id,
  ]);
  let branches = queryClient.getQueryData<SelectBranch[]>([
    "branches",
    user?.id,
  ]);
  let levels = queryClient.getQueryData<SelectLevel[]>(["levels", user?.id]);

  if (!chapters) {
    const chaptersRes = await fetch("/api/chapters");
    chapters = await chaptersRes.json();
    queryClient.setQueryData(["chapters", user?.id], chapters);
  }

  if (!branches) {
    const branchesRes = await fetch("/api/branches");
    branches = await branchesRes.json();
    queryClient.setQueryData(["branches", user?.id], branches);
  }

  if (!levels) {
    const levelsRes = await fetch("/api/levels");
    levels = await levelsRes.json();
    queryClient.setQueryData(["levels", user?.id], levels);
  }

  return {
    chapters,
    branches,
    levels,
  };
};
