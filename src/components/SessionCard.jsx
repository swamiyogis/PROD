import React from 'react';

export default function SessionCard({ sessionHeading, sessionSeats, date, onBookNow }) {
  return (
    <div className="session-card">
      <h3>{sessionHeading}</h3>
      <p>Date: {date}</p>
      <p>Seats Remaining: {sessionSeats}</p>
      <button onClick={onBookNow}>Book Now</button>
    </div>
  );
}
