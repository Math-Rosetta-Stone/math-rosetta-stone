"use client";

import { useRouter } from "next/navigation";
import { PermissionContext } from "@/app/contexts/permissionproviders";
import { useContext, useEffect } from "react";
import LoadingAnimation from "@/components/ui/loadinganimation";
import { GamePositionContext } from "@/app/contexts/gamepositionproviders";

const PermissionPage = () => {
  const router = useRouter();
  const { currBranch, gamePosition, setGamePosition, incrementGamePosition } =
    useContext(GamePositionContext);
  const { permissions, updatePermissions } = useContext(PermissionContext);

  useEffect(() => {
    incrementGamePosition(currBranch);
    const currentPermission = permissions.find(
      permission =>
        permission.level_no === gamePosition[currBranch].level_no &&
        permission.branch_no === gamePosition[currBranch].branch_no &&
        permission.chapter_no === gamePosition[currBranch].chapter_no
    );
    if (
      gamePosition &&
      permissions.some(
        permission =>
          permission.level_no === gamePosition[currBranch].level_no &&
          permission.branch_no === gamePosition[currBranch].branch_no &&
          permission.chapter_no === gamePosition[currBranch].chapter_no
      )
    ) {
      const currentPermission = permissions.find(
        permission =>
          permission.level_no === gamePosition[currBranch].level_no &&
          permission.branch_no === gamePosition[currBranch].branch_no &&
          permission.chapter_no === gamePosition[currBranch].chapter_no
      );

      if (!currentPermission) return;

      updatePermissions(gamePosition[currBranch]);

      const updatePermissionDB = async () => {
        try {
          const response = await fetch(
            `/api/permission/${gamePosition[currBranch].branch_no}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                updatedChapterNo: gamePosition[currBranch].chapter_no,
                updatedLevelNo: gamePosition[currBranch].level_no,
              }),
            }
          );

          if (!response.ok) {
            const data = await response.json();
            console.error(
              "Error updating permission:",
              data.error || "Unknown error"
            );
            return;
          }

          const data = await response.json();
          updatePermissions(data.payload);
          console.log("Updated permissions:", permissions);
        } catch (error) {
          console.error("Failed to update permissions:", error);
        }
      };

      setGamePosition(gamePosition[currBranch]);
      updatePermissionDB();
      router.push("/map");
    }
  }, [gamePosition, permissions, setGamePosition, updatePermissions]);

  return <LoadingAnimation />;
};

export default PermissionPage;
