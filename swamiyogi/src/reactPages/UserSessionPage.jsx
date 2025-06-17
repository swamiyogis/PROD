import React, { useEffect } from 'react';
import styles from './UserSessionPage.module.css';
import { useUser } from './providers/UserProvider';
import Seo from './components/seo';

function UserSessionsPage() {
  const { session: sessions, getSession } = useUser();

  useEffect(() => {
    getSession();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isExpired = date < now;

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    return {
      date: date.toLocaleDateString(undefined, options),
      time: date.toLocaleTimeString(undefined, timeOptions),
      isExpired,
    };
  };

  return (
    <>
      <Seo
        title="My Yoga Sessions | SwamiYogi"
        description="View and join your upcoming and past yoga sessions with Sumita Dwivedi."
        url="https://swamiyogi.com/mysessions"
        image="https://swamiyogi.com/images/user-sessions-banner.jpg"
      />

      <div className={styles['user-session-container']}>
        <h2 className={styles['user-session-title']}>My Sessions</h2>

        {!sessions || sessions.length === 0 ? (
          <div className={styles['user-session-empty']}>You have no booked sessions.</div>
        ) : (
          <div className={styles['user-session-grid']}>
            {sessions.map((session) => {
              const { date, time, isExpired } = formatDateTime(session.Date);
              const status = session.status?.toLowerCase() || 'unknown';

              return (
                <div
                  key={session.order_id}
                  className={`${styles['user-session-card']} ${styles[status] || ''}`}
                >
                  <div className={styles['user-session-header']}>
                    <div className={styles['user-session-id']}>Session ID: {session.session_id}</div>
                    <div className={`${styles['user-session-status']} ${styles[status]}`}>
                      {session.status}
                    </div>
                  </div>

                  <div className={styles['user-session-info']}>📅 {date}</div>
                  <div className={styles['user-session-info']}>⏰ {time}</div>
                  <div className={styles['user-session-info']}>👤 {session.instructor}</div>
                  <div className={styles['user-session-price']}>₹{session.amount}/-</div>

                  {session.status !== 'Pending' && session.status !== 'Refunded' && (
                    <button
                      className={styles['user-session-btn']}
                      disabled={isExpired}
                      onClick={() => alert(`Joining session ${session.session_id}`)}
                    >
                      {isExpired ? 'Expired' : 'Join Now'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default UserSessionsPage;
