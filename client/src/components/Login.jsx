import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const BACKEND_URL = 'http://localhost:5005';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Retrieving the function from the context
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLogin = e => {
    // Prevent the page from reload beacuse of the form submit
    e.preventDefault();
    // Assign request body
    const reqBody = { username, password };
    // Post the request body to the login route on the backend
    axios
      .post(`${BACKEND_URL}/auth/login`, reqBody)
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
      });
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onKeyPress={e => e.key === 'Enter' && handleLogin(e)}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={e => setUsername(e.target.value)}
          placeholder="Min 6 characters"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Min 8 characters"
          required
        />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
