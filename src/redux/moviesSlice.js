import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const OMDB_API_KEY = "82baae03"; // Reemplaza con tu API key de OMDB

// Thunk para obtener películas desde la API
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchQuery) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchQuery}&apikey=${OMDB_API_KEY}`
    );
    if (response.data.Response) {
      return response.data.Search;
    } else {
      throw new Error(response.data.Error);
    }
  }
);

// Thunk para obtener detalles de una película por ID
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${movieId}&apikey=${OMDB_API_KEY}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No se pudo obtener la película.");
    }
  }
);

// Slice de Redux
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    arrFavorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter((id) => id !== movieId);
      } else {
        state.favorites.push(movieId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchMovieById
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.selectedMovie = null;
        state.arrFavorites = [];
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
        state.arrFavorites.push(action.payload);
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Exporta las acciones y el reducer
export const {
  selectMovie,
  clearSelectedMovie,
  toggleFavorite,
  clearFavorites,
} = moviesSlice.actions;

export default moviesSlice.reducer;
