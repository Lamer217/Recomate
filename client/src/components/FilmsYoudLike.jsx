import React, { useState, useEffect } from 'react';
import { uid } from 'uid/single';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function FilmsYoudLike({ query }) {
  const [movies, setMovies] = useState([]);
  const [imgSources, setImgSources] = useState({});
  const currentPage = useLocation().pathname;

  // When the query get's passed, call the backend remote route to search for the query
  useEffect(() => {
    if (query) {
      // Call the backend remote route
      axios
        .get(`/api/remote/similar/movies/${query}`)
        .then(response => {
          // Set movies to the response
          setMovies(response.data.Similar.Results);
        })
        .catch(err => console.error(err));
    }
  }, [query]);

  // Now get the images for the movies
  useEffect(() => {
    if (movies.length) {
      movies.forEach(movie => {
        axios
          .get(`/api/remote/movies/search/${movie.Name}`)
          .then(response => {
            const tmdbFilmsArr = response.data.filter(
              retrievedMovie =>
                retrievedMovie.title.toLowerCase() === movie.Name.toLowerCase()
            );
            movie.tmdbObj = tmdbFilmsArr[0];
            // console.log(movie);
            const posterArr = tmdbFilmsArr.map(item => item.poster_path);
            posterArr.length
              ? setImgSources(imgSources => ({
                  ...imgSources,
                  [movie.Name]: `https://image.tmdb.org/t/p/w200${posterArr[0]}`,
                }))
              : setImgSources(imgSources => ({
                  ...imgSources,
                  [movie.Name]: `${window.location.origin}/default_backdrop.jpg`,
                }));
          })
          .catch(err => console.error(err));
      });
    }
  }, [movies]);

  return (
    <div>
      {currentPage === '/results' || (
        <h2>Here's what the AI thinks you'd like:</h2>
      )}
      {movies.map(movie => (
        <Link to={'/film-details'} state={movie} key={uid()}>
          <div className="movie-card">
            <img src={imgSources[movie.Name]} alt="poster" height={250} />
            <h5>{movie.Name}</h5>
          </div>
        </Link>
      ))}
    </div>
  );
}
