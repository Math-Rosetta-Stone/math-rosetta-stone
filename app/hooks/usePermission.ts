import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { GamePosition } from "@/types/map";
import { useUser } from "./useUser";
import { useRouter } from "next/navigation";
import { useGameData } from "./useGameData";
import { incrementGamePositionHelper } from "../map/helpers/gamePositionHelpers";
import { useState, useEffect } from "react";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes
const CACHE_TIME = 1000 * 60 * 10; // 10 minutes

export interface PermissionWithUser extends GamePosition {
  user_id: string;
  curr_branch_no: number;
  curr_chapter_no: number;
  curr_level_no: number;
}

export const INITIAL_PERMISSIONS: GamePosition[] = [
  { branch_no: 1, chapter_no: 1, level_no: 1 },
  { branch_no: 2, chapter_no: 1, level_no: 1 },
  { branch_no: 3, chapter_no: 1, level_no: 1 },
  { branch_no: 4, chapter_no: 1, level_no: 1 },
  { branch_no: 5, chapter_no: 1, level_no: 1 },
  { branch_no: 6, chapter_no: 1, level_no: 1 },
  { branch_no: 7, chapter_no: 1, level_no: 1 },
];

export const usePermission = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { branches, chapters } = useGameData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Important: Use a different query key to ensure no initial data interference
  const queryKey = ["permissions", user?.id, "database"];

  const {
    data: permissionsData,
    isLoading: isFetchingPermissions,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        if (!user?.id) {
          console.log("No user ID available, using initial permissions");
          return INITIAL_PERMISSIONS;
        }

        console.log("Fetching permissions for user:", user.id);
        const response = await fetch("/api/permission");

        if (!response.ok) {
          if (response.status === 401) {
            console.warn("User is not authorized. Redirecting to login...");
            router.push("/");
            return INITIAL_PERMISSIONS;
          }
          if (response.status === 404) {
            console.log(
              "No permissions found in database, using initial permissions"
            );
            return INITIAL_PERMISSIONS;
          }
          throw new Error(`Failed to fetch permissions: ${response.status}`);
        }

        const data = await response.json();
        console.log("Permissions API response:", data);

        if (!data.payload || data.payload.length === 0) {
          console.log(
            "No permissions in database payload, using initial permissions"
          );
          return INITIAL_PERMISSIONS;
        }

        // Map database format to client format
        const mappedPermissions = data.payload.map(
          (dbPerm: PermissionWithUser) => ({
            branch_no: dbPerm.curr_branch_no,
            chapter_no: dbPerm.curr_chapter_no,
            level_no: dbPerm.curr_level_no,
          })
        );

        console.log("Mapped permissions from database:", mappedPermissions);
        return mappedPermissions;
      } catch (error) {
        console.error("Error fetching permissions:", error);
        return INITIAL_PERMISSIONS;
      }
    },
    staleTime: 0, // Always fetch fresh data from the server
    gcTime: CACHE_TIME,
    enabled: !!user?.id, // Only run query when user ID is available
    initialData: undefined, // Don't use initial data to ensure we always fetch from database
  });

  // Force a refetch when the user changes
  useEffect(() => {
    if (user?.id) {
      console.log("User changed, refetching permissions");
      refetch();
    }
  }, [user?.id, refetch]);

  const updatePermission = useMutation({
    mutationFn: async (newPermission: {
      branch_no: number;
      chapter_no: number;
      level_no: number;
    }) => {
      try {
        console.log("Updating permission:", newPermission);

        const response = await fetch("/api/permission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPermission }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Permission updated successfully:", data);

        // Directly map the server response to our client format
        if (data.payload && data.payload.length > 0) {
          const mappedPermissions = data.payload.map(
            (dbPerm: PermissionWithUser) => ({
              branch_no: dbPerm.curr_branch_no,
              chapter_no: dbPerm.curr_chapter_no,
              level_no: dbPerm.curr_level_no,
            })
          );

          console.log(
            "Setting updated permissions from server:",
            mappedPermissions
          );
          // Update cache with the latest data from the server
          queryClient.setQueryData(queryKey, mappedPermissions);
        }

        return data;
      } catch (error) {
        console.error("Error updating permission:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Force refetch to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const incrementPermissionMutation = useMutation({
    mutationFn: async (permission: GamePosition) => {
      // Calculate the new permission values using helper
      const currentPermissions = permissionsData || INITIAL_PERMISSIONS;
      console.log("Incrementing from current permissions:", currentPermissions);

      const updatedPermissions = incrementGamePositionHelper(
        currentPermissions,
        permission.branch_no,
        branches,
        chapters
      );

      console.log("Calculated updated permissions:", updatedPermissions);

      const newPermission = updatedPermissions.find(
        perm => perm.branch_no === permission.branch_no
      );

      if (!newPermission) {
        throw new Error(
          `No permission found for branch ${permission.branch_no}`
        );
      }

      console.log("Sending new permission to server:", newPermission);
      // Call updatePermission with the new permission values
      return updatePermission.mutateAsync(newPermission);
    },
  });

  const incrementPermissionWithBranch = (
    permission: GamePosition
  ): Promise<any> => {
    setIsLoading(true);
    console.log("incrementPermissionWithBranch called with:", permission);

    return new Promise((resolve, reject) => {
      incrementPermissionMutation.mutate(permission, {
        onSuccess: data => {
          console.log("Permission incremented successfully:", data);
          setIsLoading(false);
          resolve(data);
        },
        onError: error => {
          console.error("Error incrementing permission:", error);
          setIsLoading(false);
          reject(error);
        },
      });
    });
  };

  // Calculate final permissions, preferring database values but falling back to initial when needed
  const finalPermissions = permissionsData || INITIAL_PERMISSIONS;

  console.log("usePermission hook returning permissions:", finalPermissions);

  return {
    permissions: finalPermissions,
    updatePermission: (newPermission: GamePosition) => {
      setIsLoading(true);
      updatePermission.mutate(newPermission, {
        onSettled: () => setIsLoading(false),
      });
    },
    incrementPermissionWithBranch,
    refetchPermissions: refetch,
    isLoading:
      isLoading ||
      isFetchingPermissions ||
      updatePermission.isPending ||
      incrementPermissionMutation.isPending,
  };
};
