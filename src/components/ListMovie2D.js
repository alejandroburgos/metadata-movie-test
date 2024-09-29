import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById, toggleFavorite } from "../redux/moviesSlice";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Tooltip } from "primereact/tooltip";
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
      favorites.forEach((id) => {
        dispatch(fetchMovieById(id));
      });
    }
  }, [dispatch, favorites, isFavoriteView]);

  const displayedMovies = isFavoriteView ? arrFavorites : movies;
  const placeholder = "https://via.placeholder.com/300x450.png?text=No+Image";
  const shortTitle = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20) + "...";
    }
    return title;
  };

  return (
    <div className="list-movie-2d">
      {loading && (
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          animationDuration=".5s"
        />
      )}
      <div className="list-movie-2d__grid">
        {displayedMovies && displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
            <div key={movie.imdbID} className="list-movie-2d__column">
              <Card
                title={
                  <>
                    <span id={`title-${movie.imdbID}`}>
                      {shortTitle(movie.Title)}
                    </span>
                    <Tooltip
                      target={`#title-${movie.imdbID}`}
                      content={movie.Title}
                    />
                  </>
                }
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
                  src={
                    movie.Poster !== "N/A" || !movie.Poster
                      ? movie.Poster
                      : placeholder
                  }
                  alt={movie.Title}
                  className="list-movie-2d__image"
                />
              </Card>
            </div>
          ))
        ) : (
          <p className="list-movie-2d__grid__empty">
            No hay películas disponibles
          </p>
        )}
      </div>
    </div>
  );
};
