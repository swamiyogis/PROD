import React from 'react';
import styles from './RefundPolicy.module.css';

const RefundPolicy = () => {
  return (
    <div className={styles["refund-policy-container"]}>
      <h1 className={styles["refund-title"]}>Refund Policy</h1>
      <p className={styles["refund-text"]}>
        At YogaFlow, your satisfaction and well-being are our priorities. If you need to cancel a session, we offer a full refund for cancellations made at least 24 hours in advance.
      </p>
      <p className={styles["refund-text"]}>
        Unfortunately, we cannot issue refunds for no-shows or cancellations made less than 24 hours before the scheduled session.
      </p>
      <p className={styles["refund-text"]}>
        If you encounter any technical issues or accidental bookings, please reach out to our support team. We’re here to help and ensure you have a smooth experience with us.
      </p>
      <p className={styles["refund-text"]}>
        Once your refund is approved the amount will be credited back to the customer source account within 15 business days.
      </p>
    </div>
  );
};

export default RefundPolicy;
