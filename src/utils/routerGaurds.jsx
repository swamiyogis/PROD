import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/auth" />;
};

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return !user ? children : <Navigate to="/" />;
};
