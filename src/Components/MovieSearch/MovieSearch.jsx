import React from 'react';
import './MovieSearch.css';

const MovieSearch = ({ searchQuery, setSearchQuery, fetchMovies }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Film axtarın..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={fetchMovies}>
        Axtar
      </button>
    </div>
  );
};

export default MovieSearch;
