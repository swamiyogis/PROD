import Head from "next/head";
import dynamic from 'next/dynamic';
import fetchReviews from '../reactPages/utils/reviews_fetch';
import fetchBanners from '../reactPages/utils/fetchBanner';

const HomePage = dynamic(() => import('../reactPages/Homepage'), { ssr: true });

const Home = (props) => {
  return (
    <>
      <Head>
        <title>SwamiYogi | Online Yoga Sessions</title>
        <meta name="description" content="Join SwamiYogi for personalized online yoga sessions, workshops, and more. Experience wellness from the comfort of your home." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
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
      <HomePage {...props} />
    </>
  );
}
export async function getServerSideProps() {
  try {
    const { poster, aboutBanner } = await fetchBanners();
    const initialReviews = await fetchReviews(40);
    
    return {
      props: {
        poster: poster ?? null,
        aboutBanner: aboutBanner ?? null,
        initialReviews: initialReviews ?? [],
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    // Optional: redirect to an error page or show fallback UI
    return {
      props: {
        poster: null,
        aboutBanner: null,
        initialReviews: [],
      },
    };
  }
}


export default Home;
