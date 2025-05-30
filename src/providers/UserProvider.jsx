import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { fetchUserSessionsByUid } from '../utils/fetchUser'; // adjust path as needed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user} = useAuth();
  const [session, setSession] = useState(null);


    const getSession = async () => {
      if (user?.uid) {
        const sessionData = await fetchUserSessionsByUid(user.uid);
        setSession(sessionData); // sessionData is an array or null
      } else {
        setSession(null);
      }
    };


  return (
    <UserContext.Provider value={{ user, session, getSession }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
