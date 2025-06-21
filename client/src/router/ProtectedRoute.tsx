import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../service/auth';
import { paths } from './routes';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} replace />;
};

export default ProtectedRoute; 