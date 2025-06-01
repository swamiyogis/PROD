import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import './Authpage.css';
import { handleGoogleSignIn } from '../utils/handleGoogleSignIn';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  return (
    <div className="auth-container" onClick={() => document.activeElement.blur()}>
      <div className="auth-content">
        <div className="auth-title" onClick={() => navigate('/')}>
          SwamiYogi
        </div>

        <div className="auth-spacer" />

        <div className="auth-center">
          {isLoading ? (
            <div className="loader" />
          ) : (
            <button className="auth-button" onClick={handleGoogleSignIn}>
              <FaGoogle className="auth-icon" />
              Continue with Google
            </button>
          )}
        </div>

        <div className="auth-spacer" />
      </div>
    </div>
  );
};

export default AuthPage;
