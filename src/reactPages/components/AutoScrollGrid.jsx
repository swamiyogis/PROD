import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { storedb } from "../utils/firebaseconfig";
import styles from "./AutoScrollGrid.module.css";
import { ClipLoader } from 'react-spinners';


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

  const refreshImage = (index) => {
    setImageUrls((prev) =>
      prev.map((url, i) =>
        i === index ? `${url}?cacheBust=${Date.now()}` : url
      )
    );
  };

  if (loading) return <ClipLoader size={40} color="#000" />;
  if (imageUrls.length === 0) return <div>No images to display</div>;

  return (
    <div className={styles['horizontal-gallery']}>
      <div className={styles['scroll-track']}>
        {[...imageUrls, ...imageUrls].map((url, i) => (
          <div className={styles['scroll-item']} key={i}>
            <img
              src={url}
              className={styles['scroll-img']}
              loading="lazy"
              alt={`Gallery ${i}`}
              onMouseEnter={() => refreshImage(i % imageUrls.length)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollGrid;
