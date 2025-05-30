import React, { createContext, useContext, useState } from 'react';

// Create the context
const SessionContext = createContext();

// Provider component
export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState([]);

  const value = {
    sessions,
    setSessions,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

// Custom hook to use the SessionContext
export function useSessions() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessions must be used within a SessionProvider');
  }
  return context;
}
