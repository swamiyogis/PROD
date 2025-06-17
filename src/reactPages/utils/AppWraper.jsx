// AppWrapper.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppWrapper = ({ children }) => {
  return (
    <>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        style={{ marginTop: '60px' }}  // Add space from the top
      />
      
      {/* App Routes / Children */}
      {children}
    </>
  );
};

