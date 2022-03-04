import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passRep, setPassRep] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = e => {
    e.preventDefault();
    console.log('handleSignup');
    if (passRep === password) {
      axios
        .post('http://localhost:5005/auth/signup', { username, password })
        .then(response => {
          if (response.status === 201) {
            console.log('New user created', response.data.user);
          }
        });
    } else {
      setMessage("Passwords don't match");
    }
  };

  return (
    <div>
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
