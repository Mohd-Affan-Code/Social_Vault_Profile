import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <DashboardShimmer />;

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
