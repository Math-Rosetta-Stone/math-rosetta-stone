import { PracticeModalProvider } from "./practicemodelproviders"

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return <PracticeModalProvider>{children}</PracticeModalProvider>
}

export default AppProviders
