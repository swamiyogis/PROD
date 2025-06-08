import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard/ReviewCard";
import "./Testimonials.css";

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
  if (isLoading) return <p>Loading...</p>;
  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <section className="testimonials section">
      <h2 className="section-title">What my Students think</h2>
      <div className="simple-carousel-container">
        <div
          className="simple-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((review, i) => (
            <div key={i} className="simple-carousel-slide">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
