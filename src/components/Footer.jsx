// Footer.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaFacebook, FaXTwitter } from 'react-icons/fa6';
import './Footer.css';
import logo from '../assets/textLogo.png';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="custom-footer">
      <div className="footer-inner">
        {/* Left: Logo */}
        <div className="footer-logo">
          <img src={logo} alt="Yoga Logo" />
        </div>

        {/* Center: Copyright + Links */}
        <div className="footer-center">
          <div className="footer-text">
            © 2024 SwamiYogi, LLC
            <span> · </span>
            <Link to="/terms">Terms & Conditions</Link>
            <span> · </span>
            <Link to="/refund">Refund Policy</Link>
            <span> · </span>
            <Link to="/faqs">Support</Link>
          </div>
          <div className="footer-contact">
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="footer-social">
          <a href="https://youtube.com/@sumita-dwivedi" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          {/* <a href="#"><FaFacebook /></a>
          <a href="#"><FaXTwitter /></a> */}
          <a href="https://www.instagram.com/swamiyogy" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
