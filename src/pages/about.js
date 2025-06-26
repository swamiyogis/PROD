import dynamic from 'next/dynamic';
import Head from 'next/head';


const About = dynamic(() => import('@/reactPages/rules/About'), { ssr: false });

const about = () =>  {
  return (
    <>
      <Head>
        <title>About | SwamiYogi</title>
         <meta name="description" content="SwamiYogi - A modern platform for yoga practices, poses, and inner peace."/>
      </Head>
      <About/>
    </>
  );
}

export default about;