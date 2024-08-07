import { PracticeModalProvider } from "./practicemodelproviders"
import { MapProviders } from "./mapproviders"
import { PermissionProvider } from "./permissionproviders"

interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <PermissionProvider>
      <MapProviders>
        <PracticeModalProvider>{children}</PracticeModalProvider>
      </MapProviders>
    </PermissionProvider>
  )
}

export default AppProviders
