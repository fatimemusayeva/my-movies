import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FavoritePage.css';
import { useNavigate } from 'react-router-dom';
const FavoritePage = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [listName, setListName] = useState('');
  const navigate = useNavigate();
  const handleHomeClick = ()=>{
    navigate('/');
    window.location.reload();
  }

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem(`favorites_${id}`));
    if (savedList) {
      setListName(savedList.name);
      setFavorites(savedList.movies);
    }
  }, [id]);

  return (
    <div className="favorite-page-container">
      <h2 className="favorite-page-header">{listName || 'Favorit Siyahısı'}</h2>
       
        <ul className="favorite-page-list">
          {favorites.map((movie) => (
            <li key={movie.imdbID} className="favorite-page-item">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="favorite-page-poster"
              />
              <div className="favorite-page-title">{movie.Title}</div>
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                className="imdb-link"
              >
                IMDB-də bax
              </a>
            </li>
          ))}
        </ul>
        <button className='favorite' onClick={handleHomeClick}>Əsas səhifəyə keş</button>
     
    </div>
  );
};

export default FavoritePage;
