import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import './Authpage.css';
import { handleGoogleSignIn } from '../utils/handleGoogleSignIn';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="auth-container" onClick={() => document.activeElement.blur()}>
      <div className="auth-content">
        <h1 className="auth-title">SwamiYogi</h1>

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
