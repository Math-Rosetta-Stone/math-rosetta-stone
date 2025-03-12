import { parseTerms } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { GamePositionContext } from "../contexts/gamepositionproviders";
import { usePermission } from "./usePermission";

export const useTerms = () => {
  const { gamePosition, currBranch } = useContext(GamePositionContext);
  const { permissions } = usePermission();
  // const {data} = useQuery({
  //   queryKey: ["unlockedTerms"],
  // });

  const getUnlockedTerms = async () => {
    let currLevel;
    for (let perm of permissions) {
      if (perm.branch_no === currBranch
        && perm.chapter_no === gamePosition[currBranch].chapter_no) {
        currLevel = perm.level_no;
        console.log("perm", perm);
        console.log("branch", currBranch);
        console.log("level", currLevel);
        break;
      }
    }
    const response = await fetch(`/api/terms?branch=${currBranch}&level=${currLevel}`);
    return (await response.json()).data;
  };

  const {data} = useQuery({
    queryKey: ["unlockedTerms"],
    queryFn: getUnlockedTerms,
    enabled: currBranch > 0,
  });

  return data ? parseTerms(data) : [];
};
