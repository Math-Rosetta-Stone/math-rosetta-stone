"use client";

import { PracticeModalProvider } from "./practicemodelproviders";
import { GamePositionProvider } from "./gamepositionproviders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProviders;
