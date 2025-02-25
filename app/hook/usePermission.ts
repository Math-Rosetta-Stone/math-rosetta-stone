import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { GamePosition } from "@/types/db";
import { useUser } from "./useUser";
import { useRouter } from "next/navigation";

const INITIAL_PERMISSIONS: GamePosition[] = [
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
  const router = useRouter();

  // Only set initial data if it doesn't exist
  const existingPermissions = queryClient.getQueryData<GamePosition[]>([
    "permissions",
    user?.id,
  ]);
  if (!existingPermissions) {
    queryClient.setQueryData(["permissions", user?.id], INITIAL_PERMISSIONS);
  }

  const { data: permissions = INITIAL_PERMISSIONS } = useQuery({
    queryKey: ["permissions", user?.id],
    queryFn: async () => {
      try {
        const response = await fetch("/api/permission");
        if (!response.ok) {
          if (response.status === 401) {
            console.warn("User is not authorized. Redirecting to login...");
            router.push("/");
            return INITIAL_PERMISSIONS;
          }
          throw new Error("Failed to fetch permissions");
        }
        const data = await response.json();
        return data.payload || INITIAL_PERMISSIONS;
      } catch (error) {
        console.error("Error fetching permissions:", error);
        router.push("/");
        return INITIAL_PERMISSIONS;
      }
    },
    enabled: !!user,
  });

  const updatePermission = useMutation({
    mutationFn: async (newPermission: GamePosition) => {
      const currentPermissions =
        queryClient.getQueryData<GamePosition[]>(["permissions", user?.id]) ??
        INITIAL_PERMISSIONS;
      return currentPermissions.map(permission =>
        permission.branch_no === newPermission.branch_no
          ? { ...permission, ...newPermission }
          : permission
      );
    },
    onSuccess: updatedPermissions => {
      queryClient.setQueryData(["permissions", user?.id], updatedPermissions);
    },
  });

  return {
    permissions: permissions as GamePosition[],
    updatePermission: (newPermission: GamePosition) =>
      updatePermission.mutate(newPermission),
    isLoading: updatePermission.isPending,
  };
};
