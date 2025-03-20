"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import LoadingAnimation from "@/components/ui/loadinganimation";
import { SelectUser } from "@/app/db/schema";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P & { user: SelectUser }>
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { user, isLoading } = useUser();

    if (isLoading) {
      return <LoadingAnimation />;
    }

    if (!user) {
      router.push("/");
      return null;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}
