import { AuthProvider } from "./src/contexts/AuthContext";

import Navigation from "./src/router";

import { startNetworkLogging } from "react-native-network-logger";

export default function App() {
  startNetworkLogging();

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
