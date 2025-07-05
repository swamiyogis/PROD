// pages/UploadPage.jsx
import { useState } from "react";
import { storage, storedb } from "./utils/firebaseconfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

import {
  doc,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp, 
  collection
} from "firebase/firestore";


import styles from './Upload.module.css';

const UploadPage = () => {
  const [poster, setPoster] = useState(null);
  const [banner, setBanner] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState({});

  const uploadFile = (file, path) =>
    new Promise((resolve, reject) => {
      const fileRef = ref(storage, `${path}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        null,
        reject,
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(resolve)
            .catch(reject);
        }
      );
    });

  const handleUpload = async () => {
  setUploading(true);
  const uploadedUrls = {};

  try {
    // Upload Poster
    if (poster) {
      const posterURL = await uploadFile(poster, "poster");
      uploadedUrls.poster = posterURL;

      // Save poster with fixed ID to 'images' collection
      await setDoc(doc(storedb, "images", "banner"), {
        poster: posterURL
      }, { merge: true });
    }

    // Upload Banner
    if (banner) {
      const bannerURL = await uploadFile(banner, "poster");
      uploadedUrls.banner = bannerURL;

      // Save banner with fixed ID to 'images' collection
      await setDoc(doc(storedb, "images", "banner"), {
        aboutbanner: bannerURL
      }, { merge: true });
    }

    // Upload Gallery
    const galleryUrls = [];
    for (const img of gallery) {
        const url = await uploadFile(img, "gallery");
        galleryUrls.push(url);

        // Update 'imageUrls' array in 'jdfdsfnsd' doc
        await setDoc(doc(storedb, "images", "jdfdsfnsd"), {}, { merge: true }); // optional create-if-missing
        await updateDoc(doc(storedb, "images", "jdfdsfnsd"), {
        imageUrls: arrayUnion(url)
        });

        }


    uploadedUrls.gallery = galleryUrls;
    setUrls(uploadedUrls);
    alert("✅ Upload successful!");
  } catch (err) {
    console.error("Upload error:", err);
    alert("❌ Upload failed.");
  }

  setUploading(false);
};


  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Upload Media Files</h1>

      <div className={styles['form-group']}>
        <label htmlFor="poster">Poster Image:</label>
        <input
          id="poster"
          type="file"
          accept="image/*"
          onChange={(e) => setPoster(e.target.files[0])}
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="banner">Banner Image:</label>
        <input
          id="banner"
          type="file"
          accept="image/*"
          onChange={(e) => setBanner(e.target.files[0])}
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="gallery">Gallery Images:</label>
        <input
          id="gallery"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setGallery(Array.from(e.target.files))}
        />
      </div>

      <button
        className={styles['upload-button']}
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload All"}
      </button>

      <div className={styles['result-section']}>
        {urls.poster && (
          <p>
            ✅ Poster Uploaded:{" "}
            <a href={urls.poster} target="_blank" rel="noopener noreferrer">
              View Poster
            </a>
          </p>
        )}
        {urls.banner && (
          <p>
            ✅ Banner Uploaded:{" "}
            <a href={urls.banner} target="_blank" rel="noopener noreferrer">
              View Banner
            </a>
          </p>
        )}
        {urls.gallery?.length > 0 && (
          <div className={styles['gallery-list']}>
            <h3>✅ Gallery Images Uploaded:</h3>
            <ul>
              {urls.gallery.map((url, i) => (
                <li key={i}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Image {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
