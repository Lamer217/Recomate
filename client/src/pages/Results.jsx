import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { uid } from 'uid/single';

export default function Results() {
  const location = useLocation();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5005/api/remote/similar/movies/${location.state}`)
      // location.state being the query passed from the preferences page
      .then(response => response.json())
      .then(data => {
        setMovies(data.Similar.Results);
      })
      .catch(err => console.error(err));
  }, [location.state]);

  return (
    <div>
      {movies.map(movie => (
        <h5 key={uid()}>{movie.Name}</h5>
      ))}
    </div>
  );
}
