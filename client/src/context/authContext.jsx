// src/context/auth.context.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = token => {
    // Save the token to the local storage
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = () => {
    // Get the token from the local storage
    const storedToken = localStorage.getItem('authToken');

    // If there is a token in the local storage
    if (storedToken) {
      // We must send the JWT token in the 'Authorization' headers
      axios
        .get(
          `/auth/verify`, // Calling the verify route from backend
          // Adding a custom header to the get request
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then(response => {
          // If the server verifies that the JWT is valid
          const user = response.data;

          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          // console.log(user);
          setUser(user);
        })
        .catch(err => {
          // If the token is invalid - server will send an error
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
          console.error(err);
        });
    } else {
      // If there is no token on the client
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  // This will check if the user is logged in every time when the app starts
  useEffect(() => {
    authenticateUser();
  }, []);

  const removeToken = () => {
    // Upon logout - remove the token from the local storage
    localStorage.removeItem('authToken');
  };

  const logoutUser = () => {
    // To logout the user - remove the token
    removeToken();

    // And update the state variables
    authenticateUser();
  };

  // Regex validators
  const usernameRegex = username =>
    /^(?=[a-z_\d]*[a-z])[a-z_\d]{5,16}$/i.test(username);

  const passwordRegex = password =>
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,16}$/gm.test(password);

  // Function for input 'error' style
  const invalidInputStyle = stateToCheck => {
    if (stateToCheck)
      return {
        boxShadow: 'inset 0 0 5px 2px red',
      };
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logoutUser,
        usernameRegex,
        passwordRegex,
        invalidInputStyle,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
