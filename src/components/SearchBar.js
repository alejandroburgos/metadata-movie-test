import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useLocation } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";

const SearchBar = ({ onSearch, onFilter, selectFilter }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilter = (e) => {
    onFilter(e.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filterOptions = [
    { name: "Todos", value: "all" },
    { name: "Películas", value: "movie" },
    { name: "Series", value: "series" },
  ];

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-container">
        <h1 className="title">Movies and Series</h1>

        {location.pathname !== "/favorites" && (
          <>
            <div className="select-filter">
              <SelectButton
                optionLabel="name"
                value={selectFilter}
                options={filterOptions}
                onChange={handleFilter}
              />
            </div>

            <div className="search-bar-input">
              <InputText
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar películas..."
              />
              <Button
                className="search-btn"
                icon="pi pi-search"
                onClick={handleSearch}
              />
              <Link to="/favorites">
                <Button
                  className="search-btn"
                  label="Favoritos"
                  icon="pi pi-star"
                />
              </Link>
            </div>
          </>
        )}

        {location.pathname === "/favorites" && (
          <Link to="/">
            <Button
              className="search-btn"
              label="Volver"
              icon="pi pi-arrow-left"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
