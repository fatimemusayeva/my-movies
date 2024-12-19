import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import MovieSearch from './Components/MovieSearch/MovieSearch';
import MovieList from './Components/MovieList/MovieList';
import FavoriteList from './Components/FavoriteList/FavoriteList';
import FavoritePage from './Components/FavoritePage/FavoritePage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesName, setFavoritesName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savedLink, setSavedLink] = useState('');

  const fetchMovies = (query) => {
    fetch(`https://www.omdbapi.com/?apikey=5c2c55ed&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search.slice(0, 10));
          setNoResults(false);
        } else {
          setMovies([]);
          setNoResults(true);
        }
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
        setMovies([]);
        setNoResults(true);
      });
  };

  useEffect(() => {
    fetchMovies('batman');
  }, []);

  const addToFavorites = (movie) => {
    if (!isSaved && !favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    if (!isSaved) {
      setFavorites(favorites.filter((movie) => movie.imdbID !== id));
    }
  };

  const saveList = () => {
    if (favorites.length === 0 || favoritesName === '') {
      alert('Favoritlər üçün ad daxil edin!');
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    localStorage.setItem(`favorites_${id}`, JSON.stringify({ name: favoritesName, movies: favorites }));
    setSavedLink(`/list/${id}`);
    setIsSaved(true);

  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1 className="app-header">Film Axtarış Sistemi</h1>
              <MovieSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                fetchMovies={() => fetchMovies(searchQuery)}
              />

              <div className="lists-container">
                <div className="movie-list-container">
                  {noResults ? ( 
                    <p className="no-results-message">Film tapılmadı.</p>
                  ) : (
                    <MovieList movies={movies} addToFavorites={addToFavorites} />
                  )}
                </div>

                <div className="favorite-container">
                  <FavoriteList
                    favorites={favorites}
                    removeFromFavorites={removeFromFavorites}
                    favoritesName={favoritesName}
                    setFavoritesName={setFavoritesName}
                    saveList={saveList}
                    isSaved={isSaved}
                  />
                  {savedLink && (
                    <div className="save-link">
                      <button className="favorite">
                        <NavLink to={savedLink}>Favorite liste keçid</NavLink>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
        />
        <Route path="/list/:id" element={<FavoritePage />} />
      </Routes>
    </div>
  );
};

export default App;
