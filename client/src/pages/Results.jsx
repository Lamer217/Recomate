import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { uid } from 'uid/single';
import Navbar from '../components/Navbar';

export default function Results() {
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [imgSources, setImgSources] = useState({});

  useEffect(() => {
    // send the query to the TMDB first, to find a proper title
    fetch(`http://localhost:5005/api/remote/movies/search/${location.state}`)
      .then(response => response.json())
      .then(resultsArr => setQuery(resultsArr[0].title))
      .catch(err => console.error(err));
  }, [location.state]);

  useEffect(() => {
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
  }, [query]);

  // Retrieving the posters when the movie is added to the movies state
  useEffect(() => {
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
  }, [movies]);

  return (
    <div>
      <Navbar />
      <h2>If you liked {query} you migh also like:</h2>
      {movies.map(movie => (
        <div className="movie-card" key={uid()}>
          <img src={imgSources[movie.Name]} alt="poster" height={250} />
          <h5>{movie.Name}</h5>
        </div>
      ))}
    </div>
  );
}
