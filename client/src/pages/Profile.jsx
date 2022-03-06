import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import IsPrivate from '../components/IsPrivate';

export default function Profile() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <IsPrivate>{isLoggedIn ? <div>ProFile</div> : navigate('/')}</IsPrivate>
  );
}
