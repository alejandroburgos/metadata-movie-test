import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Home2D } from "./pages/Home2D.js";
import { Home3D } from "./pages/Home3D.js";
import MovieDetail from "./components/MovieDetail.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home2D />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/3d" element={<Home3D />} />
        <Route path="/favorites" element={<Home2D isFavoriteView={true} />} />
      </Routes>
    </>
  );
}

export default App;
