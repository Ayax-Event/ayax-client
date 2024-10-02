import "./gesture-handler";
import { AuthProvider } from "./src/contexts/AuthContext";

import Navigation from "./src/router";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
