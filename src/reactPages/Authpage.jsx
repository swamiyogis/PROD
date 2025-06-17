import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import styles from './Authpage.module.css'; // Use CSS modules
import { handleGoogleSignIn } from './utils/handleGoogleSignIn';
import { useRouter } from 'next/router';
import Seo from './components/seo';


const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Wrap sign-in with loading state and error handling
  const onGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await handleGoogleSignIn();
      router.push('/dashboard'); // Redirect after successful login
    } catch (error) {
      alert('Google sign-in failed. Please try again.');
      console.error('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Seo
        title="Login | SwamiYogi"
        description="Sign in to SwamiYogi using your Google account and start your personalized yoga journey."
        image="https://swamiyogi.com/images/social-login.jpg"
        url="https://swamiyogi.com/auth"
      />
      <div className={styles['auth-container']} onClick={() => document.activeElement.blur()}>
      <div className={styles['auth-content']}>
        <div className={styles['auth-title']} onClick={() => router.push('/')}>
          SwamiYogi
        </div>

        <div className={styles['auth-spacer']} />

        <div className={styles['auth-center']}>
          {isLoading ? (
            <div className={styles.loader} />
          ) : (
            <button className={styles['auth-button']} onClick={onGoogleSignIn} type="button">
              <FaGoogle className={styles['auth-icon']} />
              Continue with Google
            </button>
          )}
        </div>

        <div className={styles['auth-spacer']} />
      </div>
    </div>
    </>
  );
};

export default AuthPage;
