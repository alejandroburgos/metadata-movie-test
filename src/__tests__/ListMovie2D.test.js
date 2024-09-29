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

jest.mock("primereact/card", () => ({
  Card: ({ title, children }) => (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock("primereact/button", () => ({
  Button: ({ label, onClick }) => <button onClick={onClick}>{label}</button>,
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

  test("renders loading spinner when loading", () => {
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

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
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
      screen.getByText("No hay películas disponibles")
    ).toBeInTheDocument();
  });

  test("renders placeholder image if movie poster is not available", () => {
    const movies = [{ imdbID: "1", Title: "Movie 1", Poster: "N/A" }];

    render(
      <Provider store={store}>
        <Router>
          <ListMovie2D movies={movies} favorites={[]} isFavoriteView={false} />
        </Router>
      </Provider>
    );

    const placeholder = screen.getByAltText("Movie 1");
    expect(placeholder).toHaveAttribute(
      "src",
      "https://via.placeholder.com/300x450.png?text=No+Image"
    );
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
  });
});
