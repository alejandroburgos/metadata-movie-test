import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/moviesSlice";
import { ListMovie3D } from "../components/ListMovie3D";

export const Home3D = ({ isFavoriteView }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectFilter, setSelectFilter] = useState("all");
  const movies = useSelector((state) => state.movies);
  const favorites = useSelector((state) => state.movies.favorites);

  const dispatch = useDispatch();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchMovies(searchQuery));
    }
  }, [searchQuery, dispatch]);

  const handleFilter = (type) => {
    setSelectFilter(type);
  };

  const filteredMovies = () => {
    if (selectFilter === "all") {
      return movies.movies;
    }
    return movies.movies.filter((movie) => movie.Type === selectFilter);
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        selectFilter={selectFilter}
      />
      <div className="container-3d">
        <ListMovie3D
          movies={filteredMovies()}
          favorites={favorites}
          isFavoriteView={isFavoriteView}
        />
      </div>
    </div>
  );
};
