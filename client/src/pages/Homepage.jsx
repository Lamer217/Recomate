import React, { useState } from 'react';
import Preferences from '../components/Preferences';
import Signup from '../components/Signup';
import Login from '../components/Login';

export default function Homepage() {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <>
      <h1>Recomate - helps you find what else is worth watching</h1>
      <div>
        {signup ? (
          <Signup setSignup={setSignup} setLogin={setLogin} />
        ) : (
          <button onClick={() => setSignup(!signup)}>Sign up</button>
        )}
        {login ? (
          <Login />
        ) : (
          <button onClick={() => setLogin(!login)}>Login</button>
        )}
      </div>
      <button>Just let me see what else to watch</button>
      {/* ⬆ This will triger the preferences element to show ⬆ */}
      <Preferences />
    </>
  );
}
