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

      const serialize = (session) => JSON.stringify(session);

      if (prevSessions.length === 0) {
        // First time load - do nothing
      } else {
        const addedSessions = newSessions.filter(
          (s) => !prevSessions.some((p) => serialize(p) === serialize(s))
        );

        for (const session of addedSessions) {
          if (session.status === "Confirmed") {
            toast.success("✅ Booking confirmed");
          } else if (session.status === "Pending") {
            toast.info("⏳ Booking pending");
          }
        }

        const removedSessions = prevSessions.filter(
          (p) => !newSessions.some((s) => serialize(s) === serialize(p))
        );

        if (removedSessions.length > 0) {
          toast.warn("⚠️ Session removed");
        }
      }

      prevSessionsRef.current = newSessions;
    });

    return () => unsubscribe();
  }, [user]);

  return null;
};
