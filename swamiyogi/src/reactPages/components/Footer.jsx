import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.css'; // ✅ Correct if you're using CSS modules
import logo from '../assets/textLogo.png';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className={styles['custom-footer']}>
      <div className={styles['footer-inner']}>
        {/* Left: Logo */}
        <div className={styles['footer-logo']}>
          <img src={logo.src} alt="Yoga Logo" />
        </div>

        {/* Center: Copyright + Links */}
        <div className={styles['footer-center']}>
          <div className={styles['footer-text']}>
            © 2024 SwamiYogi, LLC
            <span> · </span>
            <Link rel="preload" href="/terms">Terms & Conditions</Link>
            <span> · </span>
            <Link rel="preload" href="/refund">Refund Policy</Link>
            <span> · </span>
            <Link rel="preload" href="/faqs">Support</Link>
          </div>
          <div className={styles['footer-contact']}>
            <Link rel="preload" href="/contact">Contact Us</Link>
          </div>
          <p>Sumita Karunapati Dubey</p>
        </div>

        {/* Right: Social Icons */}
        <div className={styles['footer-social']}>
          <a href="https://youtube.com/@sumita-dwivedi" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="https://www.instagram.com/swamiyogy" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
