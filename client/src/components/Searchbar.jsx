import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

export default function Searchbar() {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.length > 2) {
      axios
        .get(`/api/remote/movies/search/${searchValue}`)
        .then(response => setOptions(response.data.slice(0, 4)))
        .catch(err => console.error(err));
    }
  }, [searchValue]);

  return (
    <div className="searchbar">
      <input
        type="search"
        name="searchValue"
        id="searchValue"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="Enter a movie you liked"
        autoFocus
      />
      <ul>
        {options.length > 0 &&
          searchValue.length > 2 &&
          options.map(option => {
            return (
              <li>
                <button
                  onClick={() => navigate('/results', { state: option.title })}
                  key={option.id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${option.poster_path}`}
                    alt=""
                    height="50"
                  />
                  {option.title}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
