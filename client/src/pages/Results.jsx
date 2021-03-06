import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import FilmsYoudLike from '../components/FilmsYoudLike';
import '../styles/Results.css';

export default function Results() {
  const location = useLocation();
  const { user, isLoggedIn } = useContext(AuthContext);
  const query = location.state;

  useEffect(() => {
    // If the user is logged in and if there is a user object in the context
    // Add the query (title of a liked movie) to the user document in DB
    if (user && isLoggedIn && query) {
      /* Have to create a backend route to add the query
         to the user document in DB */
      const requestBody = { id: user._id, filmTitle: query };
      axios
        .put(`/api/films/add-film`, requestBody)
        .then()
        .catch(err => console.error(err));
    }
  }, [query, user, isLoggedIn]);

  return (
    <div className="results">
      {query && <h2>If you liked {query} you migh also like:</h2>}
      <FilmsYoudLike query={query} />
    </div>
  );
}
