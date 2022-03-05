import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
  const { logoutUser, isLoggedIn } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
