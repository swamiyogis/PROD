import Head from 'next/head';
import dynamic from 'next/dynamic';

const YogaDayPage = dynamic(() => import('@/reactPages/YogaDayPage'), { ssr: false });

export default function yogaday2025() {
  return (
    <>
      <Head>
        <title>International Yoga Day | SwamiYogi</title>
        <meta
          name="description"
          content="Celebrate International Yoga Day with us! Explore sessions, events, and special workshops to deepen your practice."
        />
      </Head>
      <YogaDayPage />
    </>
  );
}
