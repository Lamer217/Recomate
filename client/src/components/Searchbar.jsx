import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

export default function Searchbar() {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.length > 2) {
      axios
        .get(`/api/remote/movies/search/${searchValue}`)
        .then(response => setOptions(response.data.slice(0, 4)))
        .catch(err => console.error(err));
    }
  }, [searchValue]);

  // Sets the query value to first item title in options
  // Query will be sent on Enter press from the input
  useEffect(() => {
    if (options.length) {
      setQuery(options[0].title);
    }
  }, [options]);

  // On enter press sends the movie title to the FilmsYoudLike
  const handleSearch = () => {
    navigate('/results', { state: query });
  };

  return (
    <div className="searchbar">
      <input
        type="search"
        name="searchValue"
        id="searchValue"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleSearch(e)}
        placeholder="Enter a movie you liked"
        autoFocus
        autoComplete="off"
      />
      <ul>
        {options.length > 0 &&
          searchValue.length > 2 &&
          options.map(option => {
            return (
              <li key={option.id}>
                <button
                  onClick={() => navigate('/results', { state: option.title })}
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
