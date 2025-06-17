import React, { useEffect, useState } from 'react';
import styles from './ReviewCard.module.css'; // ✅ CSS Module

const StarIcon = ({ type }) => {
  switch (type) {
    case 'full':
      return <i className={`fas fa-star ${styles['starIcon']}`} aria-label="Full star" />;
    case 'half':
      return <i className={`fas fa-star-half-alt ${styles['starIcon']}`} aria-label="Half star" />;
    default:
      return <i className={`far fa-star ${styles['starIcon']}`} aria-label="Empty star" />;
  }
};

export default function ReviewCard({ review }) {
  const { stars, reviewerPhotoUrl, text, name, reviewerUrl } = review;

  const starsArray = Array.from({ length: 5 }, (_, i) => {
    if (stars >= i + 1) return 'full';
    if (stars > i) return 'half';
    return 'empty';
  });

  const handleClick = () => {
    if (reviewerUrl) {
      try {
        window.open(reviewerUrl, '_blank', 'noopener,noreferrer');
      } catch {
        alert('Could not open reviewer URL');
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
      className={styles['reviewCard']}
      aria-label={`Review by ${name}`}
    >
      <div className={styles['starsContainer']}>
        {starsArray.map((type, i) => (
          <StarIcon key={i} type={type} />
        ))}
      </div>

      <div className={styles['photoContainer']}>
        <img
          src={reviewerPhotoUrl}
          alt={`${name}'s avatar`}
          className={styles['photoImg']}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
          }}
        />
      </div>

      <p className={styles['reviewText']}>{text}</p>
      <p className={styles['reviewName']}>- {name}</p>
    </div>
  );
}
