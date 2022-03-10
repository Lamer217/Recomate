import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/FilmDetails.css';
import YoutubeEmbed from '../components/YoutubeEmbed';
import Fade from 'react-reveal/Fade';

export default function FilmDetail() {
  const state = useLocation().state;
  console.log(state);
  const backdropUrl = state.tmdbObj.backdrop_path;
  const backdropSource = `https://image.tmdb.org/t/p/original${backdropUrl}`;
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };
  const [cast, setCast] = useState([]);

  const fistrThreeSentences = state.wTeaser.split('.').slice(0, 3).join('.');
  const allOtherSentences = state.wTeaser.split('.').slice(3).join('.');

  useEffect(() => {
    axios
      .get(`/api/remote/movies/cast/${state.tmdbObj.id}`)
      .then(response => setCast(response.data))
      .catch(err => console.error(err));
  }, [state.tmdbObj.id]);

  return (
    <div
      className="film-details"
      style={{
        background: backdropUrl
          ? `url(${backdropSource}) no-repeat center center/cover`
          : `url(${window.location.origin}/default_backdrop.jpg) no-repeat center center/cover`,
      }}
    >
      <Fade durations={3000} delay={400}>
        <div className="wrapper">
          <h1>{state.Name}</h1>
          <div className="genres">
            {state.tmdbObj.genre_ids.map(genreId => (
              <span key={genreId}>{genres[genreId]}</span>
            ))}
          </div>
          <div>
            <h4>The cast: </h4>
            <div className="cast-container">
              {cast.length &&
                cast.map(actor => (
                  <div key={actor.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                      alt={actor.name}
                      height="170"
                    />
                    <div>
                      <h4>{actor.name}</h4>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p>{fistrThreeSentences}.</p>
            <div className="desc-iframe">
              <p>{allOtherSentences}</p>
              {state.yID && <YoutubeEmbed embedId={state.yID} />}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
