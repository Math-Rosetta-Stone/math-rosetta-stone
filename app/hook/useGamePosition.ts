import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GamePosition } from "@/types/db"
import { useUser } from "./useUser"
import { SelectBranch, SelectChapter } from "../db/schema"

const INITIAL_GAME_POSITION: GamePosition[] = [
  {
    branch_no: 1,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 2,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 3,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 4,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 5,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 6,
    chapter_no: 1,
    level_no: 1,
  },
  {
    branch_no: 7,
    chapter_no: 1,
    level_no: 1,
  },
]

export const useGamePosition = () => {
  const queryClient = useQueryClient()
  const { user } = useUser()

  queryClient.setQueryData(["gamePosition", user?.id], INITIAL_GAME_POSITION)

  const updateGamePosition = useMutation({
    mutationFn: async (newPosition: GamePosition) => {
      const currentPosition = queryClient.getQueryData<GamePosition[]>(["gamePosition", user?.id])

      if (!currentPosition) {
        return INITIAL_GAME_POSITION
      }

      currentPosition[newPosition.branch_no] = newPosition
      return currentPosition
    },
    onSuccess: newPosition => {
      queryClient.setQueryData(["gamePosition", user?.id], newPosition)
      queryClient.invalidateQueries({ queryKey: ["gamePosition", user?.id] })
    },
  })

  const incrementPosition = (branch_no: number) => {
    const chapters = queryClient.getQueryData<SelectChapter[]>(["chapters", user?.id])
    const branches = queryClient.getQueryData<SelectBranch[]>(["branches", user?.id])
    let currentPosition = queryClient.getQueryData<GamePosition[]>(["gamePosition", user?.id])
    if (!currentPosition) {
      currentPosition = INITIAL_GAME_POSITION
    }
    const newPosition = currentPosition[branch_no]
    const isLastChapter: boolean = branches?.[newPosition.branch_no].no_of_chapters === newPosition.chapter_no
    const isLastLevel: boolean = chapters?.[newPosition.chapter_no].no_of_minigames === newPosition.level_no
    newPosition.level_no = isLastLevel && !isLastChapter ? 1 : newPosition.level_no + 1
    newPosition.chapter_no = isLastLevel && !isLastChapter ? 1 : newPosition.chapter_no + 1

    updateGamePosition.mutate(newPosition)
  }

  const setPosition = (position: GamePosition) => {
    updateGamePosition.mutate(position)
  }

  return {
    incrementPosition,
    setPosition,
    isPending: updateGamePosition.isPending,
  }
}
