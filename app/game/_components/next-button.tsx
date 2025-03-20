"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { usePermission } from "@/app/hooks/usePermission";
import { Button } from "@/components/ui/button";
import { FaStairs } from "react-icons/fa6";

const NextButton = () => {
  const { gamePosition, incrementGamePosition, currBranch } = useContext(GamePositionContext);
  const { permissions, updatePermission } = usePermission();
  const router = useRouter();

  const handleNextLevel = () => {
    for (let perm of permissions) {
      if (perm.branch_no === currBranch) {
        /* TODO: add logic to:
        * 1. check chapter bounds (if goes above then increment chapter)
        * 2. handle level overflow (incrementing more than )
        */

        const currentLevel = gamePosition[currBranch].level_no;
        const highestUnlockedLevel = perm.level_no;
        let updatedPerm = {
          ...perm,
          level_no: currentLevel === highestUnlockedLevel ? (
            highestUnlockedLevel + 1
          ) : (
            Math.max(
              currentLevel + 1,
              highestUnlockedLevel
            )
          )
        };
        updatePermission(updatedPerm);
        break;
      }
    }
    incrementGamePosition(currBranch);
    router.push("/map");
  };

  return (
    <Button
      className="border hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300
      ease-in duration-150 disabled:bg-slate-300 disabled:text-slate-900"
      variant="default"
      onClick={handleNextLevel}>
      <FaStairs className="mr-2" />
      Next Level
    </Button>
  );
};

export default NextButton;
