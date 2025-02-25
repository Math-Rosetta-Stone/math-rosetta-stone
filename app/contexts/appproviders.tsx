"use client";

import { PracticeModalProvider } from "./practicemodelproviders";
import { PermissionProvider } from "./permissionproviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PermissionProvider>
        <PracticeModalProvider>{children}</PracticeModalProvider>
      </PermissionProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
