import React from 'react';
import './Terms.css';

function TermsAndConditions() {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to SwamiYogi! By using our services to book yoga sessions and receive Microsoft Teams links, you agree to comply with the following terms and conditions.
        </p>
      </section>

      <section>
        <h2>Booking and Attendance</h2>
        <p>
          All session bookings are final and non-refundable unless otherwise specified. Please ensure your availability before booking. Sessions may start promptly, so be ready at the scheduled time.
        </p>
      </section>

      <section>
        <h2>Microsoft Teams Links</h2>
        <p>
          Upon successful booking, you will receive a Microsoft Teams link to join your yoga session. Please do not share these links with others, as they are intended for registered participants only.
        </p>
      </section>

      <section>
        <h2>User Conduct</h2>
        <p>
          We expect all users to behave respectfully during sessions. Harassment, disruptive behavior, or inappropriate conduct may result in termination of access without refund.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>
          Your personal information is handled in accordance with our Privacy Policy. We do not share your details with third parties without your consent.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          SwamiYogi is not liable for any injuries, losses, or damages arising from participation in yoga sessions or use of Microsoft Teams links.
        </p>
      </section>

      <section>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these terms at any time. Continued use of our services constitutes acceptance of any changes.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          For any questions regarding these Terms & Conditions, please contact us at <a href="mailto:support@swamiyogi.com">support@swamiyogi.com</a>.
        </p>
      </section>
    </div>
  );
}

export default TermsAndConditions;
