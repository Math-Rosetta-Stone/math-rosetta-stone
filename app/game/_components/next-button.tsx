"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { usePermission } from "@/app/hooks/usePermission";
import { FaStairs } from "react-icons/fa6";
import { GamePosition } from "@/types/map";

export default function NextButton() {
  const { gamePosition, currBranch } = useContext(GamePositionContext);
  const {
    permissions,
    incrementPermissionWithBranch,
    isLoading,
    refetchPermissions,
  } = usePermission();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Force refetch permissions when the component mounts
  useEffect(() => {
    console.log("NextButton mounted - refetching permissions");
    refetchPermissions();
  }, [refetchPermissions]);

  // Debug logging
  useEffect(() => {
    console.log("NextButton - Current permissions:", permissions);
    console.log("NextButton - Current branch:", currBranch);
    console.log("NextButton - Current game position:", gamePosition);
  }, [permissions, currBranch, gamePosition]);

  const handleNextLevel = async () => {
    // Refetch permissions first to ensure we have the latest data
    await refetchPermissions();
    console.log("Permissions refetched before handling next level");

    if (!gamePosition || !Array.isArray(gamePosition)) {
      console.error("Game position is missing or invalid");
      return;
    }

    // Get the current level information from gamePosition array
    const currentLevelPos = gamePosition.find(
      pos => pos.branch_no === currBranch
    );

    if (!currentLevelPos) {
      console.error("Current level position not found for branch", currBranch);
      return;
    }

    // Find current permission for this branch
    const currentPermission = permissions.find(
      (p: GamePosition) => p.branch_no === currBranch
    );

    if (!currentPermission) {
      console.error("No permission found for branch", currBranch);
      return;
    }

    console.log("Current level position:", currentLevelPos);
    console.log("Current permission:", currentPermission);

    setIsProcessing(true);

    try {
      // Need to increment permission for this branch
      console.log("Incrementing permission for branch", currBranch);

      // Pass the whole permission object to include branch_no
      await incrementPermissionWithBranch({
        branch_no: currBranch,
        chapter_no: currentLevelPos.chapter_no,
        level_no: currentLevelPos.level_no,
      });

      // Refetch permissions after increment to ensure data is up-to-date
      await refetchPermissions();
      console.log("Permission incremented and refetched, redirecting to map");

      router.push("/map");
    } catch (error) {
      console.error("Error handling next level:", error);
      setIsProcessing(false);
    }
  };

  const buttonText = isProcessing ? "Processing..." : "Next Level";

  return (
    <Button
      onClick={handleNextLevel}
      disabled={isLoading || isProcessing}
      className="w-full md:w-auto">
      <FaStairs className="mr-2" />
      {buttonText}
    </Button>
  );
}
