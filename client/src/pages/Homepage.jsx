import React, { useState, useContext } from 'react';
import Preferences from '../components/Preferences';
import Signup from '../components/Signup';
import Login from '../components/Login';
import { AuthContext } from '../context/authContext';

export default function Homepage() {
  const [signupForm, setSignupForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  // const [signupButton, setSignupButton] = useState(true);
  // const [loginButton, setloginButton] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <h1>Recomate - helps you find what else is worth watching</h1>
      {isLoggedIn ? (
        <Preferences />
      ) : (
        <>
          <div>
            {signupForm ? (
              <Signup
                setSignupForm={setSignupForm}
                setLoginForm={setLoginForm}
              />
            ) : (
              loginForm || (
                <button onClick={() => setSignupForm(!signupForm)}>
                  Sign up
                </button>
              )
            )}
            {loginForm ? (
              <Login
                setSignupForm={setSignupForm}
                setLoginForm={setLoginForm}
              />
            ) : (
              signupForm || (
                <button onClick={() => setLoginForm(!loginForm)}>Login</button>
              )
            )}
          </div>
          <button>Just let me see what else to watch</button>
        </>
      )}
    </>
  );
}
