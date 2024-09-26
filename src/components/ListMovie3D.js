import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, Text, ScrollControls, useScroll } from "@react-three/drei";
import { easing } from "maath";
import "../utils/three";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMovie,
  clearSelectedMovie,
  fetchMovieById,
} from "../redux/moviesSlice";

export const ListMovie3D = () => (
  <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
    <fog attach="fog" args={["#a79", 8.5, 12]} />
    <ScrollControls pages={14} horizontal damping={15} vertical={false}>
      <Rig rotation={[0, 0, 0.15]}>
        <Carousel />
      </Rig>
    </ScrollControls>
  </Canvas>
);

function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 5); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 16, state.pointer.y + 1.5, 20],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel() {
  const movies = useSelector((state) => state.movies.movies);
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);

  if (!movies) return null;

  const validMovies = movies.filter((movie) => movie.Poster !== "N/A");
  const countMovies = validMovies.length;
  const radius = countMovies / 5.5;

  return validMovies.map((movie, i) => {
    const position = [
      Math.sin((i / countMovies) * Math.PI * 2) * radius,
      0,
      Math.cos((i / countMovies) * Math.PI * 2) * radius,
    ];

    const rotation = [0, Math.PI + (i / countMovies) * Math.PI * 2, 0];

    // Si hay una película seleccionada, solo mostramos esa
    if (selectedMovie && selectedMovie.imdbID !== movie.imdbID) {
      return null;
    }

    return (
      <Card key={i} movie={movie} position={position} rotation={rotation} />
    );
  });
}

function Card({ movie, ...props }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);
  const isSelected = selectedMovie?.imdbID === movie.imdbID;

  const [hovered, setHovered] = useState(false);

  const handlePointerOver = (e) => (e.stopPropagation(), setHovered(true));
  const handlePointerOut = () => setHovered(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isSelected) {
      dispatch(clearSelectedMovie());
    } else {
      dispatch(selectMovie(movie));
      dispatch(fetchMovieById(movie.imdbID));
    }
  };

  useFrame((state, delta) => {
    // Animación de escala al pasar el ratón
    const targetScale = hovered || isSelected ? 1.5 : 1;
    easing.damp3(ref.current.scale, targetScale, 0.1, delta);
  });

  return (
    <group {...props} onClick={handleClick}>
      <group rotation={[0, Math.PI, 0]}>
        <Image
          ref={ref}
          url={movie.Poster}
          transparent
          side={THREE.DoubleSide}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </group>

      {isSelected && (
        <group position={[-6, 1.2, 1]} rotation={[0, Math.PI, 0]}>
          <Text
            color="black"
            fontSize={0.2}
            maxWidth={10}
            lineHeight={1.2}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            outlineColor="white"
            position={[0, 0, 0.01]}
          >
            {selectedMovie.Title} ({selectedMovie.Year})
          </Text>
          <Text
            color="black"
            fontSize={0.18}
            maxWidth={10}
            lineHeight={1.2}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            outlineColor="white"
            position={[0, -0.6, 0.01]}
          >
            {selectedMovie.Plot}
          </Text>
          <Text
            color="black"
            fontSize={0.3}
            maxWidth={10}
            lineHeight={1.2}
            letterSpacing={0.02}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            outlineColor="white"
            position={[0, -1.2, 0.01]}
          >
            IMDB: {selectedMovie.imdbRating}
          </Text>
        </group>
      )}
    </group>
  );
}
