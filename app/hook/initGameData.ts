import { useQueryClient } from "@tanstack/react-query"
import { SelectBranch, SelectChapter } from "@/app/db/schema"
import { useUser } from "./useUser"

export const initGameData = async () => {
  const queryClient = useQueryClient()
  const { user } = useUser()

  try {
    const chapters: SelectChapter[] = await fetchChapterData()
    const branches: SelectBranch[] = await fetchBranchData()
    queryClient.setQueryData(["chapters", user?.id], chapters)
    queryClient.setQueryData(["branches", user?.id], branches)
  } catch (error) {
    console.error("Error initializing chapters:", error)
  }
}

const fetchChapterData = async (): Promise<SelectChapter[]> => {
  const res = await fetch("/api/chapters")
  if (!res.ok) {
    throw new Error("Failed to fetch chapter data")
  }
  return res.json()
}

const fetchBranchData = async (): Promise<SelectBranch[]> => {
  const res = await fetch("/api/branches")
  if (!res.ok) {
    throw new Error("Failed to fetch branch data")
  }
  return res.json()
}
