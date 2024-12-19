import React from 'react';
import './FavoriteList.css'; 
const FavoriteList = ({ favorites, removeFromFavorites, favoritesName, setFavoritesName, saveList, isSaved }) => {
  const handleSaveList = () => {
    if (favorites.length === 0) {
      alert('Favoritlər siyahısında heç bir film yoxdur!');
      return;
    }
    if (favoritesName.trim() === '') {
      alert('Favoritlər üçün düzgün ad daxil edin!');
      return;
    }
    saveList();
  };

  return (
    <div className="favorite-container">
      <h2 className="favorite-header">Favorilər</h2>

      <ul className="favorite-list">
        {favorites.map((movie) => (
          <li key={movie.imdbID} className="favorite-item">
            <div className="favorite-title">{movie.Title}</div>
            {!isSaved && (
              <button
                className="favorite-remove-button"
                onClick={() => removeFromFavorites(movie.imdbID)}
              >
                Sil
              </button>
            )}
          </li>
        ))}
      </ul>

      {favorites.length === 0 && <p className="empty-favorites-message">Favoritlər siyahısı boşdur.</p>}

      <div className="favorites-name-input-container">
        <label htmlFor="favoritesName" className="favorites-name-label">
          Favorit siyahısına ad verin:
        </label>
        <input
          id="favoritesName"
          type="text"
          value={favoritesName}
          onChange={(e) => setFavoritesName(e.target.value)}
          placeholder="Ad daxil edin"
          className="favorites-name-input"
          disabled={isSaved}
        />
      </div>

      <button
        onClick={handleSaveList}
        className={`save-list-button ${isSaved ? 'disabled' : ''}`}
        disabled={isSaved}
      >
        Siyahını yadda saxla
      </button>
    </div>
  );
};

export default FavoriteList;
