import { PracticeModalProvider } from "./practicemodelproviders"
import { MapProviders } from "./mapproviders"

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <MapProviders>
      <PracticeModalProvider>{children}</PracticeModalProvider>
    </MapProviders>
  )
}

export default AppProviders
