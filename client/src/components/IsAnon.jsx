import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
// import { Navigate } from 'react-router-dom';

export default function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the auth is still loading
  if (isLoading) return <p>Loading...</p>;

  if (isLoggedIn) {
    return;
  } else {
    return children;
  }
}
