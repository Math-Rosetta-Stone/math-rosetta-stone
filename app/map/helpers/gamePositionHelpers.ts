import { SelectBranch, SelectChapter } from "@/app/db/schema";
import { GamePosition } from "@/types/map";

export const incrementGamePositionHelper = (
  gamePosition: GamePosition[],
  branch_no: number,
  branches: SelectBranch[] | undefined,
  chapters: SelectChapter[] | undefined
) => {
  return gamePosition.map(prevGamePos => {
    if (prevGamePos.branch_no !== branch_no) return prevGamePos;
    const newGamePos = { ...prevGamePos };

    const isLastChapter =
      branches?.find(branch => newGamePos.branch_no === branch.branch_no)
        ?.no_of_chapters === newGamePos.chapter_no;
    const isLastLevel =
      chapters?.find(
        chapter =>
          newGamePos.chapter_no === chapter.chapter_no &&
          newGamePos.branch_no === chapter.branch_no
      )?.no_of_minigames === newGamePos.level_no;

    if (isLastChapter && isLastLevel) {
      return prevGamePos;
    } else if (isLastLevel) {
      newGamePos.level_no = 1;
      newGamePos.chapter_no = newGamePos.chapter_no + 1;
    } else {
      newGamePos.level_no = newGamePos.level_no + 1;
    }
    return newGamePos;
  });
};

export const maxOfGamePosition = (
  gamePosition1: GamePosition,
  gamePosition2: GamePosition
): GamePosition | undefined => {
  if (gamePosition1.branch_no !== gamePosition2.branch_no) return undefined;
  if (
    gamePosition1.chapter_no < gamePosition2.chapter_no ||
    (gamePosition1.chapter_no === gamePosition2.chapter_no &&
      gamePosition1.level_no < gamePosition2.level_no)
  )
    return { ...gamePosition2 };
  return { ...gamePosition1 };
};
