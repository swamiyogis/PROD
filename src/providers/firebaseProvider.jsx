// FirebaseProvider.jsx
import React, { createContext, useContext } from 'react';
import { initializeApp, getApps } from 'firebase/app';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  // your config here
};

export function FirebaseProvider({ children }) {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  return (
    <FirebaseContext.Provider value={{}}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}
