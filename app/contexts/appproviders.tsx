"use client";

import { PracticeModalProvider } from "./practicemodelproviders";
import { PermissionProvider } from "./permissionproviders";
import { GamePositionProvider } from "./gamepositionproviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GamePositionProvider>
        <PermissionProvider>
          <PracticeModalProvider>{children}</PracticeModalProvider>
        </PermissionProvider>
      </GamePositionProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
