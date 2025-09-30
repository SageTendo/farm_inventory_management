import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { paths } from "./routes";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const { isAuthenticated, validateSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const resp = await validateSession();
      resp.err ? toast.error(resp.err) : null;
    };

    checkSession();
  }, [navigate]);

  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} replace />;
};

export default ProtectedRoute;
