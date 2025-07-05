// pages/index.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Seo from './components/seo'; // Updated SEO component with structuredData
import AutoScrollGrid from './components/AutoScrollGrid';
import TestimonialsSection from './components/Testimonials';
import styles from './Homepage.module.css';



export default function HomePage({ poster, aboutBanner, initialReviews }) {
  const router = useRouter();
  const [showGallery, setShowGallery] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState(initialReviews || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const gallery = document.getElementById('gallery');
      const review = document.getElementById('reviews');
      if (gallery && gallery.getBoundingClientRect().top < window.innerHeight) {
        setShowGallery(true);
      }
      if (review && review.getBoundingClientRect().top < window.innerHeight) {
        setShowReviews(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Seo
        title="SwamiYogi | Transform Your Life Through Yoga"
        description="Join Sumita Dwivedi for guided online yoga sessions and workshops designed for all levels. Start your wellness journey today!"
        keywords="yoga, wellness, meditation, SwamiYogi, online yoga, workshops, Sumita Dwivedi"
        image={`https://swamiyogi.com/${poster}`}
        url="https://swamiyogi.com"
        author="Sumita Dwivedi"
        structuredData={{
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
        }}
      />

      <div className={styles['homepage']}>
        <div className={styles['homepage-margin']}>
          <section className={`${styles['hero']} ${styles['section']}`}>
            <div
              className={styles['hero-background']}
              style={{ backgroundImage: `url('${poster}')` }}
            />
            <div className={styles['hero-content']}>
              <p>Calorie control, balanced nutrition</p>
              <h1>Start living your <br /> healthiest life</h1>
              <button onClick={() => router.push('/workshops')}>
                Book An Appointment
              </button>
            </div>
          </section>

          <section className={`${styles['about-section']} ${styles['section']}`}>
            <div className={styles['about-container']}>
              <div className={styles['about-image']}>
                <img
                  src={aboutBanner}
                  alt="Sumita Dwivedi Yoga"
                />
              </div>
              <div className={styles['about-content']}>
                <h2 className={styles['section-title']}>Meet Sumita Dwivedi</h2>
                
                <p className={styles['section-subtitle']}>
                  A Journey of Inner Peace, Balance & Transformation
                </p>

                <p className={styles['about-description']}>
                  Namaste, I’m <strong>Sumita Dwivedi</strong>, a devoted yoga practitioner and instructor with over 20 years of experience. My journey has been one of deep self-discovery, healing, and sharing the powerful wisdom of yoga with others.
                </p>

                <p className={styles['about-description']}>
                  <em>Har Har Mahadev!</em>
                </p>

                <button
                  className={styles['about-cta']}
                  onClick={() => router.push('/workshops')}
                >
                  Start Your Journey
                </button>
              </div>

            </div>
          </section>

          <section id="gallery" className={`${styles['gallery']} ${styles['section']}`}>
            {showGallery ? <AutoScrollGrid /> : <div style={{ height: 400 }}></div>}
          </section>

          <hr />

          <section id="reviews" className={`${styles['testimonials']} ${styles['section']}`}>
            <TestimonialsSection
              isLoading={isLoading}
              showReviews={showReviews}
              reviews={reviews}
            />
          </section>
        </div>
      </div>
    </>
  );
}

// // Server-side props to fetch dynamic content before render
// export async function getServerSideProps() {
//   console.log("🔄 getServerSideProps is running...");
//   const { heroImage, aboutBanner } = await fetchBanners(); 
//   const initialReviews = await fetchReviews(40);

//   return {
//     props: {
//       heroImage,
//       aboutBanner,
//       initialReviews
//     }
//   };
// }
