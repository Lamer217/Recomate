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

  /*   useEffect(() => {
    if (query) {
      fetch(`http://localhost:5005/api/remote/similar/movies/${query}`)
        // location.state being the query passed from the preferences page
        .then(response => response.json())
        .then(data => {
          setMovies(data.Similar.Results);
          // setQuery(data.Similar.Info[0].Name);
        })
        .catch(err => console.error(err));
    }
  }, [query]); */

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

  // Retrieving the posters when the movie is added to the movies state
  /*  useEffect(() => {
    movies.forEach(movie => {
      fetch(`http://localhost:5005/api/remote/movies/search/${movie.Name}`)
        .then(response => response.json())
        .then(moviesArr => {
          const posterArr = moviesArr
            .filter(
              retrievedMovie =>
                retrievedMovie.title.toLowerCase() === movie.Name.toLowerCase()
            )
            .map(item => item.poster_path);
          posterArr.length
            ? setImgSources(imgSources => ({
                ...imgSources,
                [movie.Name]: `https://image.tmdb.org/t/p/w200${posterArr[0]}`,
              }))
            : setImgSources(imgSources => ({
                ...imgSources,
                [movie.Name]:
                  'https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg',
              }));
        })
        .catch(err => console.error(err));
    });
  }, [movies]); */

  return (
    <div>
      {/* {query && <h2>If you liked {query} you migh also like:</h2>} */}
      <FilmsYoudLike query={query} />
    </div>
  );
}
