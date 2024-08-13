import { PracticeModalProvider } from "./practicemodelproviders"
import { MapProviders } from "./mapproviders"
import { PermissionProvider } from "./permissionproviders"
import { GamePositionProvider } from "./gamepositionproviders"

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <GamePositionProvider>
      <PermissionProvider>
        <MapProviders>
          <PracticeModalProvider>{children}</PracticeModalProvider>
        </MapProviders>
      </PermissionProvider>
    </GamePositionProvider>
  )
}

export default AppProviders
