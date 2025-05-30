// hooks/useSessions.js
import { useEffect, useState } from 'react';
import { db, ref, onValue } from './firebaseconfig';
import { parseSession } from '../types/session';

export const fetchSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionsRef = ref(db, 'sessions');
    const unsubscribe = onValue(sessionsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setSessions([]);
        setLoading(false);
        return;
      }

      const parsed = Object.entries(data).map(([_, value]) =>
        parseSession(value)
      );
      setSessions(parsed);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return { sessions, loading };
};
