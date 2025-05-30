// AppWrapper.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppWrapper = ({ children }) => {
  return (
    <>
      {/* Global Toast Container */}
      <ToastContainer 
        
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      
      {/* App Routes / Children */}
      {children}
    </>
  );
};

