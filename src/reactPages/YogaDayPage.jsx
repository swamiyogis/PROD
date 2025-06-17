import React from "react";
import styles from './YogaDayPage.module.css';
import Seo from './components/seo';

const YogaDayPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "International Yoga Day 2025 – Sessions by Sumita Dwivedi",
    "startDate": "2025-06-21T06:00:00+05:30",
    "endDate": "2025-06-21T19:30:00+05:30",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://swamiyogi.com/yoga-day-2025"
    },
    "image": [
      "https://picsum.photos/seed/yogaday/800/400"
    ],
    "description": "Celebrate International Yoga Day 2025 with 3 rejuvenating yoga sessions guided by Sumita Dwivedi. Open to all levels. Free and online.",
    "organizer": {
      "@type": "Person",
      "name": "Sumita Dwivedi",
      "url": "https://swamiyogi.com"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://swamiyogi.com/yoga-day-2025",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-05-01T09:00:00+05:30"
    }
  };

  return (
    <>
      <Seo
        title="International Yoga Day 2025 – Sessions by Sumita Dwivedi"
        description="Celebrate International Yoga Day 2025 with Sumita Dwivedi. Join 3 transformative yoga sessions on June 21 to restore your body, mind, and spirit."
        keywords="Yoga Day 2025, International Yoga Day, Sumita Dwivedi Yoga, Yoga Classes June 21, Yoga Events India"
        author="Sumita Dwivedi"
        url="https://swamiyogi.com/yoga-day-2025"
        image="https://picsum.photos/seed/yogaday/600"
        structuredData={structuredData}
      />

      <main className={styles['yoga-day-hero']}>
        <div className={styles['hero-content']}>
          <h1>🌿 Yoga Day Special – June 21, 2025 🌿</h1>
          <h2>With Sumita Dwivedi</h2>
          <p>
            Celebrate <strong>International Yoga Day</strong> with 3 rejuvenating sessions guided by renowned yoga instructor Sumita Dwivedi. Embrace a day of healing, inner peace, and unity.
          </p>
          <button className={styles['cta-btn']} onClick={() => alert('Reserve your spot!')}>
            Reserve Your Spot
          </button>
        </div>
        <img
          src="https://picsum.photos/seed/yogaday/800/400"
          alt="Yoga Day Celebration"
          className={styles['hero-image']}
          loading="lazy"
        />
      </main>

      <section className={styles['session-details']}>
        <h2>🧘‍♀️ Session Schedule</h2>
        <ul>
          <li>
            <strong>Morning Flow (6:00 AM – 7:30 AM):</strong> Wake up your senses with gentle stretches, sun salutations, and mindfulness.
          </li>
          <li>
            <strong>Midday Balance (12:00 PM – 1:00 PM):</strong> A refreshing power yoga and breathing session to energize and focus your day.
          </li>
          <li>
            <strong>Evening Bliss (6:00 PM – 7:30 PM):</strong> Deep relaxation and guided meditation to close the day in serenity.
          </li>
        </ul>
      </section>

      <section className={styles['why-join']}>
        <h2>Why Join This Event?</h2>
        <p>
          🌟 Guided by Sumita Dwivedi, a practitioner with 20+ years of experience  
          <br />🌟 Open to all levels – beginner to advanced  
          <br />🌟 Perfect way to celebrate International Yoga Day mindfully  
          <br />🌟 Free registration & online participation available  
        </p>
      </section>
    </>
  );
};

export default YogaDayPage;
