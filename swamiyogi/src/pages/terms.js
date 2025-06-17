import Head from 'next/head';
import dynamic from 'next/dynamic';

const Terms = dynamic(() => import('@/reactPages/rules/Terms'), { ssr: false });

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | SwamiYogi</title>
        <meta
          name="description"
          content="Review the terms and conditions for using SwamiYogi services, including user responsibilities, platform usage, and legal policies."
        />
      </Head>
      <Terms />
    </>
  );
}
