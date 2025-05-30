import React from 'react';
import './FAQs.css';

const FAQs = () => {
  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        <div className="faq-item">
          <h3>How do I receive my session link?</h3>
          <p>After booking, you'll get a Microsoft Teams link via email within a few minutes.</p>
        </div>
        <div className="faq-item">
          <h3>Can I reschedule my session?</h3>
          <p>Yes, you can reschedule up to 12 hours in advance using your booking confirmation email.</p>
        </div>
        <div className="faq-item">
          <h3>Do you offer trial sessions?</h3>
          <p>Yes! Your first session is absolutely free—no credit card required.</p>
        </div>
        <div className="faq-item">
          <h3>What should I wear for the session?</h3>
          <p>Wear comfortable clothing that allows free movement. Yoga pants and a fitted top are ideal.</p>
        </div>
        <div className="faq-item">
          <h3>Do I need any equipment?</h3>
          <p>A yoga mat is recommended. If you don't have one, a towel on a soft surface can work for your first session.</p>
        </div>
        <div className="faq-item">
          <h3>Are the sessions beginner-friendly?</h3>
          <p>Absolutely! All our classes are designed to accommodate beginners as well as experienced yogis.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
