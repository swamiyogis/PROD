import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './utils/firebaseconfig';
import ShowPaymentModal from './components/ShowPaymentModal';
import styles from './Workshop.module.css';
import { fetchSession } from './utils/fetchSession';
import { useAuth } from './providers/AuthProvider';
import SessionCard from './components/SessionCard';
import { ClipLoader } from 'react-spinners';
import Seo from './components/seo';

export default function WorkshopPage() {
  const { user } = useAuth();
  const { sessions, loadings } = fetchSession();
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const sessionRef = ref(db, 'sessions');
    const unsubscribe = onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      setLoading(false); // stop loader even if no data
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div style={{ height: '800px' }}>
        <ClipLoader size={40} color="#000" />
      </div>
    );

  if (!sessions || sessions.length === 0)
    return (
      <div className={styles['empty']}>No sessions available at the moment.</div>
    );

  return (
    <>
      <Seo
        title="Yoga Workshops | SwamiYogi"
        description="Explore upcoming live yoga workshops with SwamiYogi. Join guided sessions designed to elevate your practice."
        url="https://swamiyogi.com/workshops"
        image="https://swamiyogi.com/images/workshop-banner.jpg"
        keywords="yoga workshops, online yoga, swamiyogi workshops, live yoga sessions"
        author="Sumita Dwivedi"
      />
      
      <div className={styles['workshop-container']}>
        <h1 className={styles['workshop-title']}>Upcoming Workshops</h1>
        <div className={styles['workshop-grid']}>
          {sessions.map((session) => (
            <SessionCard
              key={session.sessionId}
              session={session}
              user={user}
              onBook={setSelectedSession}
            />
          ))}
        </div>

        {selectedSession && (
          <ShowPaymentModal
            show={Boolean(selectedSession)}
            onHide={() => setSelectedSession(null)}
            session={selectedSession}
          />
        )}
      </div>
    </>
  );
}
