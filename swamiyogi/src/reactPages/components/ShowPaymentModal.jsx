import React from 'react';
import styles from './ShowPaymentModal.module.css';
import { useRouter } from 'next/router';

function ShowPaymentModal({ show, onHide, session }) {
  const router = useRouter();

  if (!show || !session) return null;

  const handleOverlayClick = () => {
    onHide();
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // prevent closing modal when clicking inside content
  };

  const handlePayNow = () => {
        router.push({
      pathname: '/payments',
      query: { sessionId: session.sessionId }
    });

  };

  return (
    <div
      className={styles['modalOverlay']}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={styles['modalContent']}
        onClick={handleModalClick}
        tabIndex={-1}
      >
        <div className={styles['modalHeader']}>
          <h5>{session.sessionHeading}</h5>
          <button
            onClick={onHide}
            aria-label="Close modal"
            className={styles['closeButton']}
          >
            &times;
          </button>
        </div>
        <div className={styles['modalBody']}>
          <ul className={styles['listGroup']}>
            <li className={styles['listItem']}>
              <strong>Instructor:</strong> {session.instructor}
            </li>
            <li className={styles['listItem']}>
              <strong>Time:</strong> {session.date}
            </li>
            <li className={styles['listItem']}>
              <strong>Amount:</strong> {session.amount}
            </li>
            <li className={styles['listItem']}>
              <strong>About the Session:</strong>
              <br />
              A rejuvenating yoga and meditation session focused on mental clarity and physical balance.
            </li>
            <li className={styles['listItem']}>
              <strong>More Info:</strong>
              <br />
              Bring your own mat. Suitable for all levels.
            </li>
          </ul>
        </div>
        <div className={styles['modalFooter']}>
          <button
            onClick={handlePayNow}
            className={styles['payButton']}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowPaymentModal;
