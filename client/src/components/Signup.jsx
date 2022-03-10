import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import '../styles/Signup.css';

export default function Signup({ setSignupForm, setLoginForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPassRep, setInvalidPassRep] = useState(false);

  const {
    storeToken,
    authenticateUser,
    usernameRegex,
    passwordRegex,
    invalidInputStyle,
  } = useContext(AuthContext);

  const handleSignup = e => {
    // Prevent page reload on form submission
    e.preventDefault();

    // Assign request body
    const reqBody = { username, password };

    // Check if user had entered an intended password
    if (!invalidUsername && !invalidPassword && !invalidPassRep) {
      // If yes - post the req.body to the backend route
      axios
        .post(`/auth/signup`, reqBody)
        .then(response => {
          // Backend should respond with the 'created' code
          if (response.status === 201) {
            // And with the JWT token for an immediate new user authorisation
            // First we store the token on the client
            storeToken(response.data.authToken);

            // After that we can authenticate the new user
            // so that it is considered logged in
            authenticateUser();
          }
        })
        .catch(err => {
          const errorMessage = err.response.data.errMessage;
          setErrMessage(errorMessage);
          console.error(err);
        });
    } else {
      return;
    }
  };

  const handleLogin = () => {
    setSignupForm(false);
    setLoginForm(true);
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
    if (e.target.value && !usernameRegex(e.target.value)) {
      setInvalidUsername(true);
    } else setInvalidUsername(false);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    if (e.target.value && !passwordRegex(e.target.value)) {
      setInvalidPassword(true);
    } else setInvalidPassword(false);
  };

  const handlePassRepChange = e => {
    if (e.target.value && e.target.value !== password) {
      setInvalidPassRep(true);
    } else setInvalidPassRep(false);
  };

  return (
    <div className="signup-card">
      <h2>Sign up</h2>
      {errMessage && <span>{errMessage}</span>}
      <form onKeyPress={e => e.key === 'Enter' && handleSignup(e)}>
        <div>
          <label htmlFor="username">Username </label>
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
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            placeholder="Min 8 characters"
            required
            style={invalidInputStyle(invalidPassword)}
          />
        </div>
        <div>
          <label htmlFor="passRep">Repeat your password </label>
          <input
            type="password"
            id="passRep"
            onChange={handlePassRepChange}
            required
            style={invalidInputStyle(invalidPassRep)}
          />
        </div>
      </form>
      <p>Already have an account?</p>
      <button className="btn btn-sec" onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
}
