import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-left">
        <p>ContactUs</p>
        <h2>Ready To Personalize Your Space?</h2>
        <p>
          Our service is for people who believe in owning a safe, clean,
          and organized space. We promise that engaging with what we make will
          help you declutter your life.
        </p>
        <p>Sumita Karunapati Dubey</p>
      </div>
      <form className="contact-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Phone Number" />
        <textarea rows="3" placeholder="Anything we should know?" />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
