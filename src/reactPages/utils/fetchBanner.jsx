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
        aboutBanner: data.aboutbanner || ''
      };
    } else {
      console.warn('No banner document found.');
      return {
        poster: '',
        aboutBanner: ''
      };
    }
  } catch (error) {
    console.error('Error loading banner image:', error);
    return {
      poster: '',
      aboutBanner: ''
    };
  }
};

export default fetchBanners;
