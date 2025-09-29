import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { paths } from "./routes";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, validateSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    validateSession();
  }, [navigate]);

  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} replace />;
};

export default ProtectedRoute;
