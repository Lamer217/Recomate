import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import '../styles/Signup.css';

export default function Signup({ setSignupForm, setLoginForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passRep, setPassRep] = useState('');
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSignup = e => {
    // Prevent page reload on form submission
    e.preventDefault();

    // Assign request body
    const reqBody = { username, password };

    // Check if user had entered an intended password
    if (passRep === password) {
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
      setMessage("Passwords don't match");
    }
  };

  const handleLogin = () => {
    setSignupForm(false);
    setLoginForm(true);
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
            onChange={e => setUsername(e.target.value)}
            placeholder="Min 6 characters"
            required
          />
        </div>
        {message && <p>{message}</p>}
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Min 8 characters"
            required
          />
        </div>
        <div>
          <label htmlFor="passRep">Repeat your password </label>
          <input
            type="password"
            id="passRep"
            onChange={e => setPassRep(e.target.value)}
            required
          />
        </div>
      </form>
      <p>Already have an account?</p>
      <button class="btn btn-sec" onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
}
