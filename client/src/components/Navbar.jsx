import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../styles/Navbar.css';

const inlineLogo = `${window.location.origin}/logo-inline.png`;
const miniLogo = `${window.location.origin}/logo-mini.png`;

export default function Navbar() {
  const { logoutUser, isLoggedIn } = useContext(AuthContext);
  const currentPage = useLocation().pathname;
  const onHomePage = currentPage === '/';

  return (
    <nav
      style={{
        display: !isLoggedIn && onHomePage && 'none',
        marginBottom: isLoggedIn && onHomePage && '1.5rem',
      }}
    >
      <ul>
        {/* Display link to homepage if on other page */}
        {/* {onHomePage || (
          <li className="btn">
            <Link to="/">Home</Link>
          </li>
        )} */}
        {/* If on homepage - display inline logo, else mini logo */}
        {onHomePage ? (
          <li>
            <Link to="/">
              <img
                src={inlineLogo}
                alt="recomate logo"
                className="inline-logo"
              />
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/">
              <img src={miniLogo} alt="recomate logo" className="mini-logo" />
            </Link>
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
