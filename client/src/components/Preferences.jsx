import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Preferences() {
  // Saving the query here
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleQuery = e => {
    e.preventDefault();
    // Send the query to the results page and navigate there
    navigate('/results', { state: query });
  };

  return (
    <div>
      <form onSubmit={handleQuery}>
        <label htmlFor="">Input movie that you liked </label>
        {/* Getting the query from here */}
        <input type="text" onChange={e => setQuery(e.target.value)} />
      </form>
    </div>
  );
}
