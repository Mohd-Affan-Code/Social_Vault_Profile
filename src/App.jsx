import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./routes/AuthLayout";
import { authService } from "./services/appwrite/auth";
import DashboardShimmer from "./components/shimmer/DashboardShimmer";

function App() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        console.log(currentUser);
        setUser(currentUser);
        console.log(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <DashboardShimmer />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
          }
        />

        <Route
          path="/signup"
          element={
            user ? <Navigate to="/dashboard" /> : <Signup setUser={setUser} />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} setUser={setUser}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
