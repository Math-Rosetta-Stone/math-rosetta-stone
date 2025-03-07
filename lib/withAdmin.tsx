"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/hook/useUser";
import LoadingAnimation from "@/components/ui/loadinganimation";
import { SelectUser } from "@/app/db/schema";

export function withAdmin<P extends object>(
  WrappedComponent: React.ComponentType<
    P & { user: SelectUser; isAdmin: boolean }
  >
) {
  return function WithAdminComponent(props: P) {
    const router = useRouter();
    const { user, isLoading } = useUser();

    if (isLoading) {
      return <LoadingAnimation />;
    }

    if (!user) {
      router.push("/");
      return null;
    }

    if (!user.is_admin) {
      router.push("/map");
      return null;
    }

    return <WrappedComponent {...props} user={user} isAdmin={true} />;
  };
}
