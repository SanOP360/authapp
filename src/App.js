

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./components/store/AuthContext";

import { Routes, Route , Navigate } from "react-router-dom";

function App() {
  const authctx=useContext(AuthContext)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authctx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {authctx.isLoggedIn && (
          <Route path="/profile" element={<UserProfile />} />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
