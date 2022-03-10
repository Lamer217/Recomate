import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import '../styles/Login.css';

export default function Login({ setSignupForm, setLoginForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  // Retrieving the functions from the context
  const {
    storeToken,
    authenticateUser,
    usernameRegex,
    passwordRegex,
    invalidInputStyle,
  } = useContext(AuthContext);

  const handleLogin = e => {
    // Prevent the page from reload beacuse of the form submit
    e.preventDefault();
    // Check if the inputs fulfill the validation
    if (invalidUsername || invalidPassword) return;
    // Assign request body
    const reqBody = { username, password };
    // Post the request body to the login route on the backend
    axios
      .post(`/auth/login`, reqBody)
      .then(response => {
        // Backend should respond with the JWT string
        // console.log('JWT token', response.data.authToken);
        storeToken(response.data.authToken);

        // Verify the user by sending a request to the 'verify' route
        authenticateUser();
      })
      .catch(err => {
        // Getting to the predefined message from the backend
        const errMessage = err.response.data.errMessage;
        setMessage(errMessage);
        console.error(err);
      });
  };

  const handleSignup = () => {
    setLoginForm(false);
    setSignupForm(true);
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
    if (e.target.value && !usernameRegex(e.target.value)) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    if (e.target.value && !passwordRegex(e.target.value)) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onKeyPress={e => e.key === 'Enter' && handleLogin(e)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={handleUsernameChange}
            placeholder="Min 5 characters"
            required
            style={invalidInputStyle(invalidUsername)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            placeholder="Min 8 characters"
            required
            style={invalidInputStyle(invalidPassword)}
          />
        </div>
      </form>
      {message && <p>{message}</p>}
      <p>Don't have an account yet?</p>
      <button className="btn btn-sec" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
}
