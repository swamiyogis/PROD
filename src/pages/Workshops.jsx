  import React, { useEffect, useState } from 'react';
  import { ref, onValue } from 'firebase/database';
  import { db } from '../utils/firebaseconfig';
  import { useNavigate } from 'react-router-dom';
  import { useUser } from '../providers/UserProvider';
  import parseSessionDate from '../utils/parseSessionDate';
  import ShowPaymentModal from '../components/ShowPaymentModal';
  import './Workshop.css';
  import { fetchSession} from '../utils/fetchSession';
import { useAuth } from '../providers/AuthProvider';


  export default function WorkshopPage() {
   const { user} = useAuth();
    const { sessions, loadings } = fetchSession();
    const [loading, setLoading] = useState(true);

    // New state for modal control
    const [selectedSession, setSelectedSession] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      const sessionRef = ref(db, 'sessions');
      const unsubscribe = onValue(sessionRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setLoading(false);
          return;
        }

        const list = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setLoading(false);
      });

      return () => unsubscribe();
    }, [sessions]);

    if (loading) return <div className="loading">Loading workshops...</div>;
    if (!sessions || sessions.length === 0)
      return <div className="empty">No sessions available at the moment.</div>;

    return (
      <div className="workshop-container">
        <h1 className="workshop-title">Upcoming Workshops</h1>
        <div className="workshop-grid">
          {sessions.map((session) => {
            const { formattedDate, formattedTime, weekday } = parseSessionDate(session.date);

            return (
              <div className="session-card" key={session.sessionId}>
                <h2 className="session-title">{session.sessionHeading}</h2>
                <p className="session-date">
                  {weekday}, {formattedDate} — {formattedTime}
                </p>
                <p className="session-seats">
                  Seats Remaining: <strong>{session.seatsRemaining}</strong>
                </p>
                <button
                  className="book-btn"
                  onClick={() => {
                    if (user) {
                      setSelectedSession(session); // Show modal for this session
                    } else {
                      navigate('/auth');
                    }
                  }}
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </div>

        {/* Conditionally render the modal */}
        {selectedSession && (
          <ShowPaymentModal
            show={Boolean(selectedSession)}
            onHide={() => setSelectedSession(null)}
            session={selectedSession}
          />
        )}
      </div>
    );
  }
