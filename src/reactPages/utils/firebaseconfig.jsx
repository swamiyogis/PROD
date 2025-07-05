import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {ref, onValue, getDatabase } from 'firebase/database'; // ✅ CORRECT MODULE
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; // ✅ Add this



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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const googleAuthProvider = new GoogleAuthProvider();
const storedb = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize Storage


export {auth, db, ref, onValue, storedb, googleAuthProvider, storage}
