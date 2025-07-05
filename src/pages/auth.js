import dynamic from 'next/dynamic';
import Head from 'next/head';
import { FirebaseProvider } from '.././reactPages/providers/firebaseProvider';
import {PublicRoute} from '.././reactPages/utils/publicrouter'

const Auth = dynamic(() => import('@/reactPages/Authpage'));

const auth = () =>  {
  return (
    <>
      <Head>
        <title>Login / Authentication | SwamiYogi</title>
         <meta name="description" content="SwamiYogi - A modern platform for yoga practices, poses, and inner peace."/>
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