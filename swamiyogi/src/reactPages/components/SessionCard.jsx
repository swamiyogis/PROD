import React from "react";
import styles from "./SessionCard.module.css";

export default function SessionCard({ session, onBook, user }) {
  const {
    sessionId,
    sessionHeading,
    amount,
    currency,
    date,
    seatsRemaining,
    imageUrl = "https://picsum.photos/seed/yoga/400/200",
  } = session;

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
    <div className={styles["session-card"]} key={sessionId}>
      <div className={styles["session-image-wrapper"]}>
        <img src={imageUrl} alt={sessionHeading} className={styles["session-image"]} />
      </div>
      <div className={styles["session-content"]}>
        <h3 className={styles["session-title"]}>{sessionHeading}</h3>
        <p className={styles["session-date"]}>
          {weekday}, {formattedDate} — {formattedTime}
        </p>
        <div className={styles["session-price"]}>
          {currency} {amount}/-
        </div>
        <button
          className={styles["book-btn"]}
          onClick={() => {
            if (user) {
              onBook(session);
            } else {
              window.location.href = "/auth";
            }
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
