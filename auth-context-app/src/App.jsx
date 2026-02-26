import { useContext } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthContext, AuthProvider } from "./context/AuthContext";

function AppContent() {
  const { isLoggedIn } = useContext(AuthContext);
  return <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;