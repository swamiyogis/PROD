import Head from "next/head";
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('../reactPages/Homepage').then(mod => mod.default), { ssr: false });

const Home = () => {
  return (
    <>
      <Head>
        <title>SwamiYogi | Online Yoga Sessions</title>
        <meta name="description" content="Join SwamiYogi for personalized online yoga sessions, workshops, and more. Experience wellness from the comfort of your home." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SwamiYogi",
            "url": "https://swamiyogi.com",
            "logo": "https://swamiyogi.com/logo.png",
            "sameAs": [
              "https://www.facebook.com/swamiyogi",
              "https://www.instagram.com/swamiyogi",
              "https://twitter.com/swamiyogi"
            ]
          }) }}
        />
      </Head>

      <HomePage />
    </>
  );
}

export default Home;
