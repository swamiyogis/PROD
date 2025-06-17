import Head from 'next/head';
import dynamic from 'next/dynamic';

const Workshops = dynamic(() => import('@/reactPages/Workshops'), { ssr: false });

export default function WorkshopsPage() {
  return (
    <>
      <Head>
        <title>Workshops | SwamiYogi</title>
        <meta
          name="description"
          content="Join our Yoga workshops to deepen your practice and learn from experts. Explore upcoming sessions and sign up today."
        />
      </Head>
      <Workshops />
    </>
  );
}
