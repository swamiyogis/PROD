import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { ClipLoader } from 'react-spinners';
import ErrorPage from 'next/error';

// Your allowed UID (hardcoded admin user)
const ALLOWED_UID = ["iCpf9xFrEngwWDNxdrEB0uRGIuI3", "qUR4nYo6ZURauCovcgkG9pLW9C93"]; // Replace with your actual UID

; // Replace with your admin UID

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  if (loading || (!user && typeof window !== 'undefined')) {
    return (
      <div style={{ height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ClipLoader size={40} color="#000" />
      </div>
    );
  }

  // ✅ Render children if UID matches; otherwise show 404
return ALLOWED_UID.includes(user?.uid)
  ? children
  : <ErrorPage statusCode={404} />;
};
