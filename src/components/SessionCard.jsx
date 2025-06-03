import React from "react";
import "./SessionCard.css";

// export default function SessionCard({ session, onBook, user }) {
export default function SessionCard({ session, onBook}) {
  const {
    sessionId,
    sessionHeading,
    amount,
    date,
    seatsRemaining,
    imageUrl = "https://picsum.photos/seed/yoga/400/200",
  } = session;

  // Helper to parse date info
  const parseSessionDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString(undefined, options);
    const formattedTime = dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    const weekday = dateObj.toLocaleDateString(undefined, { weekday: "long" });
    return { formattedDate, formattedTime, weekday };
  };

  const { formattedDate, formattedTime, weekday } = parseSessionDate(date);

  return (
    <div className="session-card" key={sessionId}>
      <div className="session-image-wrapper">
        <img src={imageUrl} alt={sessionHeading} className="session-image" />
      </div>
      <div className="session-content">
        <h3 className="session-title">{sessionHeading}</h3>
        <p className="session-date">
          {weekday}, — {formattedTime}
        </p>
        <div className="session-price">{amount}/-</div>
        <p className="session-seats">
          Seats Remaining: <strong>{seatsRemaining}</strong>
        </p>
        <button
          className="book-btn"
          // onClick={() => {
          //   if (user) {
          //     onBook(session);
          //   } else {
          //     // fallback if user not logged in
          //     window.location.href = "/auth";
          //   }
          // }}
          onClick={() => {
            onBook(session);
          }}
          disabled={seatsRemaining <= 0}
          title={seatsRemaining <= 0 ? "No seats available" : "Book this session"}
        >
          {seatsRemaining > 0 ? "Book Now" : "Fully Booked"}
        </button>
      </div>
    </div>
  );
}
