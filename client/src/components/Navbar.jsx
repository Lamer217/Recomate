import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
  const { logoutUser, isLoggedIn } = useContext(AuthContext);
  const currentPage = useLocation().pathname;

  return (
    <nav>
      <ul>
        {/* Display link to homepage if on other page */}
        {currentPage === '/' || (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {/* Display logout only if the user is logged in */}
        {isLoggedIn && (
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
