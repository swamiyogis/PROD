// HomePage.jsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Homepage.module.css';

import fetchReviews from './utils/reviews_fetch';
import AutoScrollGrid from './components/AutoScrollGrid';
import Footer from './components/Footer';
import fetchBanners from './utils/fetchBanner';
import TestimonialsSection from './components/Testimonials';
import Seo from './components/seo';

export default function HomePage() {
  const router = useRouter();
  const [showGallery, setShowGallery] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    fetchReviews(5).then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
    fetchBanners().then((data) => {
      setHeroImage(data);
    });
  }, []);

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
        image={`https://swamiyogi.com/${heroImage}`}
        url="https://swamiyogi.com"
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
              <button onClick={() => router.push('/workshops')}>Book An Appointment</button>
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
            <TestimonialsSection isLoading={isLoading} showReviews={showReviews} reviews={reviews} />
          </section>
        </div>

      </div>
    </>
  );
}
