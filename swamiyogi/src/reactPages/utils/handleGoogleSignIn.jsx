// handleGoogleSignIn.js or utils file
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, googleAuthProvider } from './firebaseconfig';

export const handleGoogleSignIn = async () => {
  try {
    // Use the initialized auth and provider instances
    const result = await signInWithPopup(auth, googleAuthProvider);

    // Get credential and token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // Get signed-in user info
    const user = result.user;
    // Return user or token if needed
    return { user, token };

  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error; // Optionally re-throw for handling upstream
  }
};
