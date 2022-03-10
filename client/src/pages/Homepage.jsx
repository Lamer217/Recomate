import React, { useState, useContext, useEffect } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import { AuthContext } from '../context/authContext';
import IsAnon from '../components/IsAnon';
import FilmsYoudLike from '../components/FilmsYoudLike';
import axios from 'axios';
import Searchbar from '../components/Searchbar';
import Zoom from 'react-reveal/Zoom';
import '../styles/Homepage.css';

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

  // Clear the query when the user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setQuery('');
    }
  }, [isLoggedIn]);

  console.log(query);

  return (
    <div className="homepage">
      <h1 style={{ marginTop: isLoggedIn && '1.5rem' }}>
        Recomate &#8212; helps you find what else is worth watching
      </h1>
      {isLoggedIn || (
        <IsAnon>
          <h4>Want Recomate to remember your taste?</h4>
          <div className="auth-btns-cont">
            {signupForm ? (
              <Zoom>
                <Signup
                  setSignupForm={setSignupForm}
                  setLoginForm={setLoginForm}
                />
              </Zoom>
            ) : (
              loginForm || (
                <button
                  className="btn btn-sec"
                  onClick={() => setSignupForm(!signupForm)}
                >
                  Sign up
                </button>
              )
            )}
            {loginForm || signupForm ? <span></span> : <h4>OR</h4>}
            {loginForm ? (
              <Zoom>
                <Login
                  setSignupForm={setSignupForm}
                  setLoginForm={setLoginForm}
                />
              </Zoom>
            ) : (
              signupForm || (
                <button
                  className="btn btn-sec"
                  onClick={() => setLoginForm(!loginForm)}
                >
                  Login
                </button>
              )
            )}
          </div>
        </IsAnon>
      )}
      <Searchbar />
      {isLoggedIn && query && <FilmsYoudLike query={query} />}
    </div>
  );
}
