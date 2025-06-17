import dynamic from 'next/dynamic';
import Head from 'next/head';
import { FirebaseProvider } from '.././reactPages/providers/firebaseProvider';
import {PublicRoute} from '.././reactPages/utils/publicrouter'

const Auth = dynamic(() => import('@/reactPages/Authpage'), { ssr: false });

const auth = () =>  {
  return (
    <>
      <Head>
        <title>Login / Authentication | SwamiYogi</title>
      </Head>
      <FirebaseProvider>
        <PublicRoute>
          <Auth/>
        </PublicRoute>
      </FirebaseProvider>
    </>
  );
}
auth.noLayout = true;

export default auth;