import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { ListMovie2D } from "../components/ListMovie2D";
import { useNavigate } from "react-router-dom";

const mockStore = configureStore([]);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ListMovie2D Component", () => {
  let store;
  const navigate = jest.fn();

  beforeEach(() => {
    store = mockStore({
      movies: {
        loading: false,
        arrFavorites: [],
      },
    });
    useNavigate.mockImplementation(() => navigate);
  });

  test("renders loading state", () => {
    store = mockStore({
      movies: {
        loading: true,
        arrFavorites: [],
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <ListMovie2D movies={[]} favorites={[]} isFavoriteView={false} />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("renders no movies message", () => {
    render(
      <Provider store={store}>
        <Router>
          <ListMovie2D movies={[]} favorites={[]} isFavoriteView={false} />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText("No hay películas para mostrar.")
    ).toBeInTheDocument();
  });

  test("renders movies", () => {
    const movies = [
      { imdbID: "1", Title: "Movie 1", Poster: "poster1.jpg" },
      { imdbID: "2", Title: "Movie 2", Poster: "poster2.jpg" },
    ];

    render(
      <Provider store={store}>
        <Router>
          <ListMovie2D movies={movies} favorites={[]} isFavoriteView={false} />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  test("navigates to movie details", () => {
    const movies = [{ imdbID: "1", Title: "Movie 1", Poster: "poster1.jpg" }];

    render(
      <Provider store={store}>
        <Router>
          <ListMovie2D movies={movies} favorites={[]} isFavoriteView={false} />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText("Detalles"));
    expect(navigate).toHaveBeenCalledWith("/movies/1");
  });
});
