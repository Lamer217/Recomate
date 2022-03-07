import React, { useState, useContext, useEffect } from 'react';
import Preferences from '../components/Preferences';
import Signup from '../components/Signup';
import Login from '../components/Login';
import { AuthContext } from '../context/authContext';
import IsAnon from '../components/IsAnon';
import FilmsYoudLike from '../components/FilmsYoudLike';
import axios from 'axios';

export default function Homepage() {
  const [signupForm, setSignupForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  // Query gets passed to the FilmsYoudLike component
  const [query, setQuery] = useState('');
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    // If the user is logged in and there is the user data
    if (isLoggedIn && user) {
      // Call the backend and get the user Liked movies arr,
      // it will serve as the query
      axios
        .get(`/api/films/${user._id}`)
        .then(response => {
          // If there is anything in the array - pass it to query
          if (response.data.length) {
            setQuery(response.data.join(','));
          }
        })
        .catch(err => console.error(err));
    }
  }, [isLoggedIn, user]);

  return (
    <>
      <h1>Recomate - helps you find what else is worth watching</h1>
      {isLoggedIn || (
        <IsAnon>
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
        </IsAnon>
      )}
      <Preferences />
      {isLoggedIn && query && <FilmsYoudLike query={query} />}
    </>
  );
}
