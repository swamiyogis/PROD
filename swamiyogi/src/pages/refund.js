import Head from 'next/head';
import dynamic from 'next/dynamic';

const RefundPolicy = dynamic(() => import('@/reactPages/rules/RefundPolicy'), { ssr: false });

export default function RefundPage() {
  return (
    <>
      <Head>
        <title>Refund Policy | SwamiYogi</title>
        <meta
          name="description"
          content="Read SwamiYogi's refund policy for session cancellations, technical issues, and more. We value your satisfaction and clarity."
        />
      </Head>
      <RefundPolicy />
    </>
  );
}
