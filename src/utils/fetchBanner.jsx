import { storedb } from '../utils/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';



const fetchBanners = async () => {
  try {
    const docRef = doc(storedb, 'images', 'banner');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const url = docSnap.data().poster; // assuming `poster` is a URL string
      return url; // ✅ returns the banner URL
    } else {
      console.warn('No banner document found.');
      return '';
    }
  } catch (error) {
    console.error('Error loading banner image:', error);
    return '';
  }
};

export default fetchBanners;
