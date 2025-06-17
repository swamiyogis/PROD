import Head from 'next/head';
import dynamic from 'next/dynamic';

const FAQs = dynamic(() => import('@/reactPages/rules/FAQs'), { ssr: false });

export default function faqs() {
  return (
    <>
      <Head>
        <title>FAQs | SwamiYogi</title>
      </Head>
      <FAQs />
    </>
  );
}
