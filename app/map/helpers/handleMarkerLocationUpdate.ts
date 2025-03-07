import { SelectLevel } from "@/app/db/schema";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { useContext } from "react";

interface MarkerLocationUpdate {
  level: SelectLevel;
  x: number;
  y: number;
}

export async function handleMarkerLocationUpdate<
  T extends MarkerLocationUpdate
>(props: T) {
  const { level, x, y } = props;
  try {
    const response = await fetch("/api/levels/updateLevel", {
      method: "POST",
      body: JSON.stringify({ level, x, y }),
    });
  } catch (error) {
    console.error(error);
  }
}
