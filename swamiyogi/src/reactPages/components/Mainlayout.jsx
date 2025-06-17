import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../providers/AuthProvider';
import { FaBars } from 'react-icons/fa';
import Footer from './Footer';
import styles from './Mainlayout.module.css';
import logo from '../assets/textLogo.png';

function MainLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const goTo = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={styles['app-bar']}>
        <div className={styles['logo']} onClick={() => goTo('/')}>
          <img
            src={logo.src}
            alt="SwamiYogi"
            className={styles['logo-image']}
          />
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`${styles['mobile-menu-button']} ${styles['mobile-only']}`}
          aria-label="Toggle Menu"
        >
          <FaBars />
        </button>

        {menuOpen && (
          <div className={`${styles['mobile-menu']} ${styles['mobile-only']}`}>
            <div className={styles['mobile-menu-item']} onClick={() => goTo('/workshops')}>
              Workshops
            </div>
            <div className={styles['mobile-menu-item']} onClick={() => goTo('/mysessions')}>
              MySessions
            </div>
            {!loading && !user && (
              <div className={styles['mobile-menu-item']} onClick={() => goTo('/auth')}>
                Login
              </div>
            )}
          </div>
        )}

        <nav className={`${styles['nav-buttons']} ${styles['desktop-only']}`}>
          <button className={styles['nav-button']} onClick={() => goTo('/workshops')}>
            Workshops
          </button>
          <button className={styles['nav-button']} onClick={() => goTo('/mysessions')}>
            MySessions
          </button>
          {!loading && (
            user ? (
              <img
                src={imgError ? '/assets/profile.webp' : user.photoURL}
                alt="Profile"
                className={styles['profile-pic']}
                onError={() => setImgError(true)}
              />
            ) : (
              <button className={styles['nav-button']} onClick={() => goTo('/auth')}>
                Login
              </button>
            )
          )}
        </nav>
      </header>

      <div
        className={styles['announcement-bar']}
        role="button"
        tabIndex={0}
        onClick={() => window.location.href = '/yoga-day-2025'}
        onKeyPress={(e) => { if (e.key === 'Enter') window.location.href = '/yoga-day-2025'; }}
        style={{ cursor: 'pointer' }}
      >
        <p>
          Join us in celebrating <strong>International Yoga Day</strong> on <strong>June 21</strong> 🌿 — Reserve your spot for a rejuvenating session today!
        </p>
      </div>


      <main className={styles['main-content']}>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default MainLayout;
