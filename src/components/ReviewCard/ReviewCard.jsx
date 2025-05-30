import React, { useEffect, useState } from 'react';
import './ReviewCard.css';  // plain CSS file

const StarIcon = ({ type }) => {
  switch (type) {
    case 'full':
      return <i className="fas fa-star starIcon" aria-label="Full star" />;
    case 'half':
      return <i className="fas fa-star-half-alt starIcon" aria-label="Half star" />;
    default:
      return <i className="far fa-star starIcon" aria-label="Empty star" />;
  }
};

export default function ReviewCard({ review }) {
  const { stars, reviewerPhotoUrl, text, name, reviewerUrl } = review;

  const starsArray = Array.from({ length: 5 }, (_, i) => {
    if (stars >= i + 1) return 'full';
    if (stars > i) return 'half';
    return 'empty';
  });

  const [imgError, setImgError] = useState(false);

  const handleClick = () => {
    if (reviewerUrl) {
      try {
        const newWindow = window.open(reviewerUrl, '_blank', 'noopener,noreferrer');
        
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
      className="reviewCard"
      aria-label={`Review by ${name}`}
    >
      <div className="starsContainer">
        {starsArray.map((type, i) => (
          <StarIcon key={i} type={type} />
        ))}
      </div>

      <div className="photoContainer">
        <img
        src={reviewerPhotoUrl}
        alt={`${name}'s avatar`}
        className="photoImg"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop if fallback fails
          e.target.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png'; // fallback image URL or blank
        }}


        />
      </div>

      <p
        className="reviewText"
        
      >
        {text}
      </p>

      <p
        className="reviewName"
        
      >
        - {name}
      </p>
    </div>
  );
}
