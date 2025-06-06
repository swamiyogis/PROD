import React, { useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { storedb } from './firebaseconfig';
import { toast } from 'react-toastify';
import { useAuth } from '../providers/AuthProvider';

export const FirestoreListener = () => {
  const prevSessionsRef = useRef(new Map());
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;

    const userDocRef = doc(storedb, "users", user.uid);

    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.data();
      const newSessions = data.sessions || [];

      const prevSessions = prevSessionsRef.current;

      const newSessionsMap = new Map();
      for (const session of newSessions) {
        newSessionsMap.set(session.id, session);
      }

      // Check for added or updated sessions
      for (const [id, newSession] of newSessionsMap.entries()) {
        const prevSession = prevSessions.get(id);

        if (!prevSession && newSession.status === "Confirmed") {
          toast.success("✅ Booking confirmed");
        } else if (
          prevSession &&
          prevSession.status !== "Confirmed" &&
          newSession.status === "Confirmed"
        ) {
          toast.success("✅ Booking confirmed");
        }
      }

      // Check for removed sessions
      for (const [id] of prevSessions.entries()) {
        if (!newSessionsMap.has(id)) {
          toast.warn("⚠️ Session removed");
        }
      }

      // Update reference
      prevSessionsRef.current = newSessionsMap;
    });

    return () => unsubscribe();
  }, [user]);

  return null;
};
