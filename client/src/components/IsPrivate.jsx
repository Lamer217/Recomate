import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';

export default function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the auth still loading
  if (isLoading) return <p>Loading...</p>;

  // If the user is not authenticated - return home
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    //   If the user is logged in - render the requested page/component
    return children;
  }
}
