import React, { useState } from 'react';
import Preferences from '../components/Preferences';
import Signup from '../components/Signup';

export default function Homepage() {
  const [signup, setSignup] = useState(false);

  return (
    <>
      <h1>Recomate - helps you find what else is worth watching</h1>
      <div>
        {signup ? (
          <Signup />
        ) : (
          <>
            <button>Login</button>
            <button onClick={() => setSignup(!signup)}>Sign up</button>
          </>
        )}
        {/* Login or signup here | Maybe as a separate components */}
      </div>
      <button>Just let me see what else to watch</button>
      {/* ⬆ This will triger the preferences element to show ⬆ */}
      <Preferences />
    </>
  );
}
