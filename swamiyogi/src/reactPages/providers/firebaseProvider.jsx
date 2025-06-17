// FirebaseProvider.jsx
import React, { createContext, useContext } from 'react';
import { initializeApp, getApps } from 'firebase/app';

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: 'AIzaSyAF5HjRVjo_ZBispumvSH1q_SB3VnFUpwk',
    appId: '1:697118422970:web:4d1e7fca0b85045579cf83',
    messagingSenderId: '697118422970',
    projectId: 'hirect-app-13237',
    authDomain: 'hirect-app-13237.firebaseapp.com',
    databaseURL: 'https://hirect-app-13237-default-rtdb.firebaseio.com',
    storageBucket: 'hirect-app-13237.appspot.com',
    measurementId: 'G-2SPRWNW9WK',
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
