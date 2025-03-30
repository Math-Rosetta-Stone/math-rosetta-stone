import { parseTerms } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { GamePositionContext } from "../contexts/gamepositionproviders";
import { usePermission } from "./usePermission";
import { SelectTerms } from "../db/schema";

export const useTerms = () => {
  const { gamePosition, currBranch } = useContext(GamePositionContext);
  const { permissions } = usePermission();

  const getUnlockedTerms = async () => {
    let currLevel;
    for (let perm of permissions) {
      if (perm.branch_no === currBranch) {
        currLevel = perm.level_no;
        break;
      }
    }
    const response = await fetch(
      `/api/terms?branch=${currBranch}&level=${currLevel}`
    );
    return (await response.json()).data;
  };

  const { data, isPending } = useQuery({
    queryKey: ["unlockedTerms"],
    queryFn: getUnlockedTerms,
    enabled: currBranch > 0,
  });

  return {
    data: data ? parseTerms(getRandomAmountOfTerms(data, 1)) : [],
    isPending,
  };
};

const getRandomAmountOfTerms = (data: SelectTerms[], amount: number) => {
  const indexes: number[] = [];
  Array.from({ length: amount }, (_, i) =>
    indexes.push(Math.floor(Math.random() * data.length - 1))
  );
  return data.filter((_, index) => indexes.includes(index));
};
