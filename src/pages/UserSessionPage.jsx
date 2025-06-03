import React, { useEffect } from 'react';
import './UserSessionPage.css';
import { useUser } from '../providers/UserProvider';

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
    <div className="user-session-container">
      <h2 className="user-session-title">My Sessions</h2>

      {!sessions || sessions.length === 0 ? (
        <div className="user-session-empty">You have no booked sessions.</div>
      ) : (
        <div className="user-session-grid">
          {sessions.map((session) => {
            const { date, time, isExpired } = formatDateTime(session.Date);
            const statusClass = session.status.toLowerCase();

            return (
              <div
                key={session.order_id}
                className={`user-session-card ${statusClass}`}
              >
                <div className="user-session-header">
                  <div className="user-session-id">Session ID: {session.session_id}</div>
                  <div className={`user-session-status ${statusClass}`}>
                    {session.status}
                  </div>
                </div>
                <div className="user-session-info">📅 {date}</div>
                <div className="user-session-info">⏰ {time}</div>
                <div className="user-session-info">👤 {session.instructor}</div>
                <div className="user-session-price"> {session.amount}/-</div>

                {session.status !== 'Pending' && session.status !== 'Refunded' && (
                  <button
                    className="user-session-btn"
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
  );
}

export default UserSessionsPage;
