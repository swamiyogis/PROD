import { collection, getDocs, limit, query } from 'firebase/firestore';
import { storedb } from './firebaseconfig';

const fetchReviews = async (limitCount = 5) => {
  try {
    const q = query(collection(storedb, 'Ratings'), limit(limitCount));
    const snapshot = await getDocs(q);

    const reviews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export default fetchReviews;
