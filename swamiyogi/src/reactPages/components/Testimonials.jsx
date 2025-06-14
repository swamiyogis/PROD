import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard/ReviewCard";
import styles from "./Testimonials.module.css";
import { ClipLoader } from 'react-spinners';


const TestimonialsSection = ({ reviews, isLoading, showReviews }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!reviews || reviews.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews]);

  if (!showReviews) return <div style={{ height: 300 }} />;
  if (isLoading) return <ClipLoader size={40} color="#000" />
  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <section className={`${styles['testimonials']} ${styles['section']}`}>
      <h2 className={styles['section-title']}>What my Students think</h2>
      <div className={styles['simple-carousel-container']}>
        <div
          className={styles['simple-carousel-track']}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((review, i) => (
            <div key={i} className={styles['simple-carousel-slide']}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
