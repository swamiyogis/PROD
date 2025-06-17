// pages/index.jsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Seo from '../components/Seo'; // Updated SEO component with structuredData
import AutoScrollGrid from '../components/AutoScrollGrid';
import TestimonialsSection from '../components/Testimonials';
import styles from '../styles/Homepage.module.css';

import fetchReviews from '../utils/reviews_fetch';
import fetchBanners from '../utils/fetchBanner';

export default function HomePage({ heroImage, initialReviews }) {
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
        image={`https://swamiyogi.com/${heroImage}`}
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
              style={{ backgroundImage: `url('${heroImage}')` }}
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
                  src="https://picsum.photos/seed/174/600"
                  alt="Sumita Dwivedi Yoga"
                />
              </div>
              <div className={styles['about-content']}>
                <h2 className={styles['section-title']}>Meet Sumita Dubey & SwamiYogi</h2>
                <p className={styles['section-subtitle']}>
                  A Journey of Inner Peace, Balance & Transformation
                </p>
                <p className={styles['about-description']}>
                  With over two decades of dedicated yoga practice, Sumita Dwivedi brings
                  the timeless wisdom of yoga to life. In collaboration with SwamiYogi,
                  she empowers individuals to reconnect with their inner selves, cultivate
                  holistic well-being, and lead a more conscious, purposeful life.
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

// Server-side props to fetch dynamic content before render
export async function getServerSideProps() {
  const heroImage = await fetchBanners(); 
  const initialReviews = await fetchReviews(5);

  return {
    props: {
      heroImage,
      initialReviews
    }
  };
}
