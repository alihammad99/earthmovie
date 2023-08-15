import { useEffect, useLayoutEffect, useState } from "react";
import getPopularMovies from "@/utils/popular-movies";
import "react-alice-carousel/lib/alice-carousel.css";
import MovieSlider from "./MovieSlider";

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [width, setWidth] = useState();

  useEffect(() => {
    getPopularMovies(setMovies);
  }, []);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  if (!movies) return <p>loading...</p>;

  return (
    <div
      style={
        width < 560 ? { ...styles.container, marginTop: 36 } : styles.container
      }
    >
      <MovieSlider title="Popular Movies" movies={movies} />
    </div>
  );
}

export default PopularMovies;

const styles = {
  container: {
    maxWidth: 1228,
    margin: "auto",
    marginTop: 90,
    padding: "18px 12px 0 12px",
  },
};
