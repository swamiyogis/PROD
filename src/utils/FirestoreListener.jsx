import React, { useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { storedb } from './firebaseconfig';
import { toast } from 'react-toastify';
import { useAuth } from '../providers/AuthProvider';

export const FirestoreListener = () => {
  const prevSessionsRef = useRef([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;

    const userDocRef = doc(storedb, "users", user.uid);

    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.data();
      const newSessions = data.sessions || [];

      const prevSessions = prevSessionsRef.current;
      const prevLength = prevSessions.length;
      const newLength = newSessions.length;

      if (prevSessions.length === 0) {
        // First time load; don't show any toast
      } else if (newLength > prevLength) {
        toast.success("✅ Booking confirmed");
      } else if (newLength < prevLength) {
        toast.warn("⚠️ Session removed");
      }

      prevSessionsRef.current = newSessions;
    });

    return () => unsubscribe();
  }, [user]);

  return null;
};
