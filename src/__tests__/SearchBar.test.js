import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  const mockOnSearch = jest.fn();
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockOnFilter.mockClear();
  });

  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <SearchBar
          onSearch={mockOnSearch}
          onFilter={mockOnFilter}
          selectFilter="all"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Movies and Series")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Buscar películas...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /favoritos/i })
    ).toBeInTheDocument();
  });

  test("calls onSearch when search button is clicked", () => {
    render(
      <MemoryRouter>
        <SearchBar
          onSearch={mockOnSearch}
          onFilter={mockOnFilter}
          selectFilter="all"
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Buscar películas..."), {
      target: { value: "Inception" },
    });
    fireEvent.click(screen.getByRole("button", { name: "" }));

    expect(mockOnSearch).toHaveBeenCalledWith("Inception");
  });

  test("calls onSearch when Enter key is pressed", () => {
    render(
      <MemoryRouter>
        <SearchBar
          onSearch={mockOnSearch}
          onFilter={mockOnFilter}
          selectFilter="all"
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Buscar películas..."), {
      target: { value: "Inception" },
    });
    fireEvent.keyDown(screen.getByPlaceholderText("Buscar películas..."), {
      key: "Enter",
      code: "Enter",
    });

    expect(mockOnSearch).toHaveBeenCalledWith("Inception");
  });

  test("calls onFilter when filter option is changed", () => {
    render(
      <MemoryRouter>
        <SearchBar
          onSearch={mockOnSearch}
          onFilter={mockOnFilter}
          selectFilter="all"
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Películas"));

    expect(mockOnFilter).toHaveBeenCalledWith("movie");
  });

  test('renders "Volver" button when on /favorites route', () => {
    render(
      <MemoryRouter initialEntries={["/favorites"]}>
        <SearchBar
          onSearch={mockOnSearch}
          onFilter={mockOnFilter}
          selectFilter="all"
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /volver/i })).toBeInTheDocument();
  });
});
