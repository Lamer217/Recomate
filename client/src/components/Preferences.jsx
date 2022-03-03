import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Preferences() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const navigate = useNavigate();

  const handleQuery = e => {
    e.preventDefault();
    // console.log('it works');
    // console.log(process.env.REACT_APP_API_KEY);
    fetch(`http://localhost:5005/api/remote/similar/movies/${query}`)
      .then(response => response.json())
      .then(data => {
        setRecommendations(data.Similar.Results);
      })
      .catch(err => console.error(err));
    navigate('/results');
  };

  return (
    <div>
      <form onSubmit={handleQuery}>
        <label htmlFor="">Input movie that you liked </label>
        <input type="text" onChange={e => setQuery(e.target.value)} />
      </form>
    </div>
  );
}
