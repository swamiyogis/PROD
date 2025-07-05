import { storedb } from './firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';



const fetchBanners = async () => {
  try {
    const docRef = doc(storedb, 'images', 'banner');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        poster: data.poster || '',
        aboutbanner: data.aboutbanner || ''
      };
    } else {
      console.warn('No banner document found.');
      return {
        poster: '',
        aboutbanner: ''
      };
    }
  } catch (error) {
    console.error('Error loading banner image:', error);
    return {
      poster: '',
      aboutbanner: ''
    };
  }
};

export default fetchBanners;
