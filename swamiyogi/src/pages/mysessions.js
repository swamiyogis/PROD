import dynamic from 'next/dynamic';
import Head from 'next/head';
import { FirebaseProvider } from '../reactPages/providers/firebaseProvider';
import { PrivateRoute } from '../reactPages/utils/privaterouter';

const UserSessionPage = dynamic(() => import('@/reactPages/UserSessionPage'), { ssr: false });

export default function MySessionsPage() {
  return (
    <>
      <Head>
        <title>My Sessions | SwamiYogi</title>
        <meta name="description" content="View and manage your booked yoga sessions on SwamiYogi. Stay consistent and committed to your wellness journey." />
      </Head>

      <FirebaseProvider>
        <PrivateRoute>
          <UserSessionPage />
        </PrivateRoute>
      </FirebaseProvider>
    </>
  );
}
