import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./routes/AuthLayout";
import { authService } from "./services/appwrite/auth";
import DashboardShimmer from "./components/shimmer/DashboardShimmer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./app/authSlice";

function App() {
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null);

  const { user, loading } = useSelector((state) => state.auth);

  console.log(user);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const currentUser = await authService.getCurrentUser();
  //       console.log(currentUser);
  //       setUser(currentUser);
  //       console.log(user);
  //     } catch {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  if (loading) {
    return <DashboardShimmer />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
