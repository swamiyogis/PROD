import React from "react";
import { Helmet } from "react-helmet"; // Ensure this package is installed
import './YogaDayPage.css'
import Footer from "../components/Footer";

const YogaDayPage = () => {
  return (
    <>
      <Helmet>
        <title>International Yoga Day 2025 – Sessions by Sumita Dwivedi</title>
        <meta
          name="description"
          content="Celebrate International Yoga Day 2025 with Sumita Dwivedi. Join 3 transformative yoga sessions on June 21 to restore your body, mind, and spirit."
        />
        <meta
          name="keywords"
          content="Yoga Day 2025, International Yoga Day, Sumita Dwivedi Yoga, Yoga Classes June 21, Yoga Events India"
        />
        <meta name="author" content="Sumita Dwivedi" />
        <meta property="og:title" content="Yoga Day Special with Sumita Dwivedi" />
        <meta
          property="og:description"
          content="Join Sumita Dwivedi on June 21, 2025, for 3 powerful yoga sessions celebrating International Yoga Day."
        />
        <meta property="og:image" content="https://picsum.photos/seed/yogaday/600" />
        <meta property="og:url" content="https://yourdomain.com/yoga-day-2025" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section className="yoga-day-hero">
        <div className="hero-content">
          <h1>🌿 Yoga Day Special – June 21, 2025 🌿</h1>
          <h2>With Sumita Dwivedi</h2>
          <p>
            Celebrate **International Yoga Day** with 3 rejuvenating sessions guided by renowned yoga instructor Sumita Dwivedi. Embrace a day of healing, inner peace, and unity.
          </p>
          <button className="cta-btn">Reserve Your Spot</button>
        </div>
        <img src="https://picsum.photos/seed/yogaday/800/400" alt="Yoga Day" />
      </section>

      <section className="session-details">
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

      <section className="why-join">
        <h2>Why Join This Event?</h2>
        <p>
          🌟 Guided by Sumita Dwivedi, a practitioner with 20+ years of experience  
          <br />🌟 Open to all levels – beginner to advanced  
          <br />🌟 Perfect way to celebrate International Yoga Day mindfully  
          <br />🌟 Free registration & online participation available  
        </p>
      </section>

      <footer>
       <Footer/>
     </footer>
    </>
  );
};

export default YogaDayPage;
