import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <div className="refund-policy-container">
      <h1 className="refund-title">Refund Policy</h1>
      <p className="refund-text">
        At YogaFlow, your satisfaction and well-being are our priorities. If you need to cancel a session, we offer a full refund for cancellations made at least 24 hours in advance.
      </p>
      <p className="refund-text">
        Unfortunately, we cannot issue refunds for no-shows or cancellations made less than 24 hours before the scheduled session.
      </p>
      <p className="refund-text">
        If you encounter any technical issues or accidental bookings, please reach out to our support team. We’re here to help and ensure you have a smooth experience with us.
      </p>
    </div>
  );
};

export default RefundPolicy;
