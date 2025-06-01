import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { doc, getDoc } from "firebase/firestore";
import { storedb } from "../utils/firebaseconfig";
import "./AutoScrollGrid.css";

const AutoScrollGrid = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(storedb, "images", "jdfdsfnsd");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const urls = data.imageUrls || [];

          // Remove duplicates just in case
          const uniqueUrls = Array.from(new Set(urls));

          setImageUrls(uniqueUrls);
        } else {
          console.error("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div>Loading images...</div>;

  if (imageUrls.length === 0) return <div>No images to display</div>;

  return (
     <div className="scroll-wrapper">
      <div className="scroll-track">
        {imageUrls.map((src, idx) => (
          <div className="scroll-item" key={idx}>
            <LazyLoadImage src={src} alt={`img-${idx}`} effect="blur" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollGrid;