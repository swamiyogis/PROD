import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowPaymentModal.css';

function ShowPaymentModal ({ show, onHide, session }) {
  const navigate = useNavigate();

  if (!show || !session) return null;

  const handleOverlayClick = () => {
    onHide();
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // prevent closing modal when clicking inside content
  };

  const handlePayNow = () => {
    navigate('/payment', { state: { sessionId: session.sessionId } });
  };

  return (
    <div
      className="modalOverlay"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modalContent"
        onClick={handleModalClick}
        tabIndex={-1}
      >
        <div className="modalHeader">
          <h5>{session.sessionHeading}</h5>
          <button
            onClick={onHide}
            aria-label="Close modal"
            className="closeButton"
          >
            &times;
          </button>
        </div>
        <div className="modalBody">
          <ul className="listGroup">
            <li className="listItem">
              <strong>Instructor:</strong> {session.instructor}
            </li>
            <li className="listItem">
              <strong>Time:</strong> {session.date}
            </li>
            <li className="listItem">
              <strong>Amount:</strong> ₹{session.amount}
            </li>
            <li className="listItem">
              <strong>About the Session:</strong><br />
              A rejuvenating yoga and meditation session focused on mental clarity and physical balance.
            </li>
            <li className="listItem">
              <strong>More Info:</strong><br />
              Bring your own mat. Suitable for all levels.
            </li>
          </ul>
        </div>
        <div className="modalFooter">
          <button
            onClick={handlePayNow}
            className="payButton"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPaymentModal;
