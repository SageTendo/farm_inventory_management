import { Navigate, Outlet } from "react-router-dom";
import { paths } from "./routes";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} replace />;
};

export default ProtectedRoute;
