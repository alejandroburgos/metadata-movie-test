// MovieDetail.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById } from "../redux/moviesSlice";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const MovieDetail = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movieDetail = useSelector((state) => state.movies.selectedMovie);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovieById(movieId));
  }, [dispatch, movieId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movieDetail) return null;

  return (
    <div className="movie-detail">
      <div className="movie-detail__card">
        <Card title={movieDetail.Title} className="movie-detail__card-content">
          <img
            src={movieDetail.Poster}
            alt={movieDetail.Title}
            className="movie-detail__image"
          />
          <div className="movie-detail__info">
            <h2 className="movie-detail__year">Año: {movieDetail.Year}</h2>
            <h3 className="movie-detail__rating">
              IMDb Rating: {movieDetail.imdbRating}
            </h3>
            <p className="movie-detail__plot">
              <strong>Sinopsis:</strong> {movieDetail.Plot}
            </p>
            <Button
              label="Volver"
              icon="pi pi-arrow-left"
              className="movie-detail__button"
              onClick={() => window.history.back()}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MovieDetail;
