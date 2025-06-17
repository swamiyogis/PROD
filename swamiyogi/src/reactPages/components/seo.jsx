import Head from 'next/head';

const Seo = ({
  title = 'SwamiYogi | Online Yoga Sessions',
  description = 'Join personalized online yoga sessions and workshops with SwamiYogi from the comfort of your home.',
  keywords = 'yoga, online yoga, SwamiYogi, meditation, workshops, wellness',
  image = '/images/yoga-social.jpg',
  url = 'https://swamiyogi.com',
  author = 'Sumita Dwivedi',
  structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "International Yoga Day with Sumita Dwivedi",
    "startDate": "2025-06-21T06:00:00+05:30",
    "endDate": "2025-06-21T19:30:00+05:30",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://swamiyogi.com/yogaday"
    },
    "image": [
      "https://swamiyogi.com/images/yoga-day-event.jpg"
    ],
    "description": "Celebrate International Yoga Day 2025 with 3 free sessions by Sumita Dwivedi. All levels welcome. Online event.",
    "organizer": {
      "@type": "Person",
      "name": "Sumita Dwivedi",
      "url": "https://swamiyogi.com"
    }
  }
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow" />
    <meta charSet="UTF-8" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <link rel="canonical" href="/favicon.ico" />

    {structuredData && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    )}
  </Head>
);

export default Seo;
