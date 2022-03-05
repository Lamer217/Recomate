import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:5005';

export default function Signup({ setSignup, setLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passRep, setPassRep] = useState('');
  const [message, setMessage] = useState('');

  //   const navigate = useNavigate();

  const handleSignup = e => {
    e.preventDefault();
    console.log('handleSignup');
    const reqBody = { username, password };
    if (passRep === password) {
      axios.post(`${BACKEND_URL}/auth/signup`, reqBody).then(response => {
        if (response.status === 201) {
          console.log('New user created', response.data.user);
          /* If the user is created -> hide the signup component
           and display the login component */
          setLogin(true);
          setSignup(false);
        }
      });
    } else {
      setMessage("Passwords don't match");
    }
  };

  return (
    <div className="signup-card">
      <h2>Sign up</h2>
      <form onKeyPress={e => e.key === 'Enter' && handleSignup(e)}>
        {/* <form onSubmit={console.log('Submit')}> */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={e => setUsername(e.target.value)}
          placeholder="Min 6 characters"
          required
        />
        {message && <p>{message}</p>}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Min 8 characters"
          required
        />
        <label htmlFor="passRep">Repeat your password:</label>
        <input
          type="password"
          id="passRep"
          onChange={e => setPassRep(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
