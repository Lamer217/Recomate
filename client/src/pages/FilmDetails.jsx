import React from 'react';
import { useLocation } from 'react-router-dom';

export default function FilmDetail() {
  const state = useLocation().state;
  const backdropUrl = state.tmdbObj.backdrop_path;
  const backdropSource = `https://image.tmdb.org/t/p/original${backdropUrl}`;
  console.log(backdropUrl);
  console.log(state);
  return (
    <div
      style={{
        background: backdropUrl
          ? `url(${backdropSource}) no-repeat center/cover`
          : `url(${window.location.origin}/default_backdrop.jpg) no-repeat center/cover`,
      }}
    >
      <h1>{state.Name}</h1>
      {/* <img src={backdropSource} alt="" /> */}
    </div>
  );
}
