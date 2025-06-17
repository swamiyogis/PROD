import Head from 'next/head';
import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('@/reactPages/rules/Contact'), { ssr: false });

export default function contact() {
  return (
    <>
      <Head>
        <title>Contact Us | SwamiYogi</title>
      </Head>
      <Contact />
    </>
  );
}
