import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./AutoScrollGrid.css";

const images = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${i + 10}/200/300`);

const AutoScrollGrid = () => {
  // Duplicate images for seamless scroll
  const duplicatedImages = [...images, ...images];

  return (
    <div className="scroll-wrapper">
      <div className="scroll-track">
        {duplicatedImages.map((src, idx) => (
          <div className="scroll-item" key={idx}>
            <LazyLoadImage src={src} alt={`img-${idx}`} effect="blur" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollGrid;
