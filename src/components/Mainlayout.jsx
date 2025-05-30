import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { FaBars } from 'react-icons/fa';
import './MainLayout.css';

function MainLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false)

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu after navigation
  };

  return (
    <>
      <header className="app-bar">
        <div className="logo" onClick={() => goTo('/')}>
          SwamiYogi
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-button mobile-only"
          aria-label="Toggle Menu"
        >
          <FaBars />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu mobile-only">
            <div className="mobile-menu-item" onClick={() => goTo('/workshops')}>
              Workshops
            </div>
            <div className="mobile-menu-item" onClick={() => goTo('/mysessions')}>
              MySessions
            </div>
            {!loading && !user && (
              <div className="mobile-menu-item" onClick={() => goTo('/auth')}>
                Login
              </div>
            )}
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="nav-buttons desktop-only">
          <button className="nav-button" onClick={() => goTo('/workshops')}>
            Workshops
          </button>
          <button className="nav-button" onClick={() => goTo('/mysessions')}>
            MySessions
          </button>

          {!loading && (
            user ? (
              <img
                src={imgError ? '\assets\profile.webp' : user.photoURL}
                alt="Profile"
                className="profile-pic"
                onError={() => setImgError(true)}
              />
            ) : (
              <button className="nav-button" onClick={() => goTo('/auth')}>
                Login
              </button>
            )
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
