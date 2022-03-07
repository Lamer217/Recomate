import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import FilmsYoudLike from '../components/FilmsYoudLike';

export default function Results() {
  const location = useLocation();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // send the query to the TMDB first, to find a proper title
    axios
      .get(`/api/remote/movies/search/${location.state}`)
      .then(response => {
        setQuery(response.data[0].title);
      })
      .catch(err => console.error(err));
  }, [location.state]);

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
    <div>
      {/* {query && <h2>If you liked {query} you migh also like:</h2>} */}
      <FilmsYoudLike query={query} />
    </div>
  );
}
