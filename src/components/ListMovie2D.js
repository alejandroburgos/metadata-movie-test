import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById, toggleFavorite } from "../redux/moviesSlice";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const ListMovie2D = ({ movies, favorites, isFavoriteView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.movies.loading);
  const arrFavorites = useSelector((state) => state.movies.arrFavorites);

  const handleFavoriteToggle = (movieId) => {
    dispatch(toggleFavorite(movieId));
  };

  useEffect(() => {
    if (isFavoriteView) {
      // llamadas de una en una y que se vayan guardando en un array
      favorites.forEach((id) => {
        dispatch(fetchMovieById(id));
      });
    }
  }, [dispatch, favorites, isFavoriteView]);

  const displayedMovies = isFavoriteView ? arrFavorites : movies;

  return (
    <div className="list-movie-2d">
      {loading && <p>Cargando...</p>}
      <div className="list-movie-2d__grid">
        {displayedMovies && displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
            <div key={movie.imdbID} className="list-movie-2d__column">
              <Card
                title={movie.Title}
                className="list-movie-2d__card"
                footer={
                  <div className="list-movie-2d__footer">
                    <Button
                      icon={
                        favorites.includes(movie.imdbID)
                          ? "pi pi-star-fill"
                          : "pi pi-star"
                      }
                      onClick={() => handleFavoriteToggle(movie.imdbID)}
                      className="list-movie-2d__favorite-btn"
                    />
                    <Button
                      label="Detalles"
                      onClick={() => navigate(`/movies/${movie.imdbID}`)}
                      className="list-movie-2d__detail-btn"
                    />
                  </div>
                }
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="list-movie-2d__image"
                />
              </Card>
            </div>
          ))
        ) : (
          <p>No hay películas para mostrar.</p>
        )}
      </div>
    </div>
  );
};
