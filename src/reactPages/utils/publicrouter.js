import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { ClipLoader } from 'react-spinners';



export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/'); // Already logged in, go to home
    }
  }, [user, loading, router]);

  if (loading || (user && typeof window !== 'undefined')) return <div style={{ height: '800px' }}>
      <ClipLoader size={40} color="#000" />
    </div>;
  return !user ? children : null;
};