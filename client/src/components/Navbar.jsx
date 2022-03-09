import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { logoutUser, isLoggedIn } = useContext(AuthContext);
  const currentPage = useLocation().pathname;
  const onHomePage = currentPage === '/';

  return (
    <nav>
      <ul
        style={{
          justifyContent: onHomePage ? 'flex-end' : 'space-between',
          padding: !isLoggedIn && onHomePage && '0',
        }}
      >
        {/* Display link to homepage if on other page */}
        {onHomePage || (
          <li className="btn">
            <Link to="/">Home</Link>
          </li>
        )}
        {/* Display logout only if the user is logged in */}
        {isLoggedIn && (
          <li>
            <button className="btn" onClick={logoutUser}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
