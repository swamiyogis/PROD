import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-logo">
        <div className="dot-grid">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
      </div>
      

      <div className="footer-content">
        <h3>SUMITA KARUNAPATI DUBEY</h3>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li><Link to="/mission">Mission</Link></li>
              
            </ul>

          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/refund">Refund Policy</Link></li>
              <li><Link to="/faqs">FAQ’s</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Social</h4>
            <ul>
              <li><a href="https://www.instagram.com/swamiyogy?igsh=MTdiN3Q5OHQ0cDBqNA==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://youtube.com/@sumita-dwivedi" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © SwamiYogi</p>
        <p onClick={()=> navigate('/terms')}>Terms of Service</p>
        <p className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top ↑
        </p>

      </div>
    </footer>
  );
};

export default Footer;
