"use client";

import { PracticeModalProvider } from "./practicemodelproviders";
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
        <PracticeModalProvider>{children}</PracticeModalProvider>
      </GamePositionProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
