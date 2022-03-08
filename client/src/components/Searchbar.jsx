import React, { useState, useEffect } from 'react';
// import SelectSearch from 'react-select-search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

export default function Searchbar() {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  /*  useEffect(() => {
    if (searchValue) {
      axios
        .get(`/api/remote/movies/search/${searchValue}`)
        .then(response => console.log(response.data.slice(0, 4)))
        .catch(err => console.error(err));
    }
  }, [searchValue]); */

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
      />
      {options.length > 0 &&
        searchValue.length > 2 &&
        options.map(option => {
          return (
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
          );
        })}
      {/* <SelectSearch
        options={options}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        getOptions={query => {
          if (query) {
            setSearchValue(query);
            return new Promise((resolve, reject) => {
              axios
                .get(`/api/remote/movies/search/${query}`)
                .then(response => {
                  //   setOptions(response.data.slice(0, 4))
                  setOptions(
                    response.data.slice(0, 4).map(movie => {
                      return { name: movie.title, value: movie.title };
                    })
                  );
                })
                .catch(err => console.error(err));
            });
          }
        }}
        search
        placeholder="Your movie"
      /> */}
    </div>
  );
}
