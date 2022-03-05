import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return <>{isLoggedIn ? <div>Prodile</div> : navigate('/')}</>;
}
