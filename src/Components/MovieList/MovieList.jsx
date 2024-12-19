import React from 'react';
import './MovieList.css'; 

const MovieList = ({ movies, addToFavorites }) => {
  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">Filmlər</h2>
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-item">
          <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          <div className="movie-details">
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
            <button className="movie-button" onClick={() => addToFavorites(movie)}>
              Favoritlərə əlavə et
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
