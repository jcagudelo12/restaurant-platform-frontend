import { AuthProvider, useAuth } from "./context/AuthContext";
import { TablesProvider } from "./context/TablesContext";
import { LoginScreen } from "./screens/LoginScreen";
import { PosScreen } from "./screens/PosScreen";

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <TablesProvider>
      <PosScreen />
    </TablesProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;