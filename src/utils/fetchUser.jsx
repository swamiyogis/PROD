import { doc, getDoc } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { db, storedb } from './firebaseconfig';

const analytics = getAnalytics();

export async function fetchUserSessionsByUid(uid) {
  try {
    const docRef = doc(storedb, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.debug(`User document not found for uid: ${uid}`);
      return null;
    }

    const data = docSnap.data();
    if (!data || !Array.isArray(data.sessions) || data.sessions.length === 0) {
      return null;
    }

    return data.sessions; // <-- Return plain array of sessions
  } catch (e) {
    console.debug(`Error fetching user sessions for uid ${uid}:`, e);
    logEvent(analytics, 'fetch_user_sessions_error', {
      uid,
      error: e.toString(),
    });
    return null;
  }
}

