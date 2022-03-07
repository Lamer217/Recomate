import React, { useState, useEffect } from 'react';
import { uid } from 'uid/single';

export default function FilmsYoudLike({ query }) {
  const [movies, setMovies] = useState([]);
  const [imgSources, setImgSources] = useState({});

  // When the query get's passed, call the backend remote route to search for the query
  useEffect(() => {
    if (query) {
      // Call the backend remote route
      fetch(`http://localhost:5005/api/remote/similar/movies/${query}`)
        .then(response => response.json())
        .then(data => {
          // Set movies to the response
          setMovies(data.Similar.Results);
        })
        .catch(err => console.error(err));
    }
  }, [query]);

  // Now get the images for the movies
  useEffect(() => {
    if (movies.length) {
      movies.forEach(movie => {
        fetch(`http://localhost:5005/api/remote/movies/search/${movie.Name}`)
          .then(response => response.json())
          .then(moviesArr => {
            const posterArr = moviesArr
              .filter(
                retrievedMovie =>
                  retrievedMovie.title.toLowerCase() ===
                  movie.Name.toLowerCase()
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
    }
  }, [movies]);

  return (
    <div>
      <h2>Here's what the AI thinks you'd like:</h2>
      {movies.map(movie => (
        <div className="movie-card" key={uid()}>
          <img src={imgSources[movie.Name]} alt="poster" height={250} />
          <h5>{movie.Name}</h5>
        </div>
      ))}
    </div>
  );
}
