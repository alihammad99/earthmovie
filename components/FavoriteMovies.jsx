import { useEffect, useState } from "react";
import getFavoriteMovies from "@/utils/get-favourite-movies";
import "react-alice-carousel/lib/alice-carousel.css";
import MovieSlider from "./MovieSlider";
import { useSession } from "next-auth/react";
import MovieCard from "./MovieCard";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const { email } = session.user;
      getFavoriteMovies(email, setMovies);
    }
  }, [session]);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  if (!movies.length) return;
  if (!session) return null;

  const list = movies.map((movie) => (
    <MovieCard
      key={movie.id}
      movieId={movie.id || movie.movieId}
      poster={movie.poster_path || movie.poster}
    />
  ));

  return (
    <div style={styles.container}>
      <h3>Favorite List</h3>
      <div style={styles.list}>{list}</div>
    </div>
  );
};

export default FavoriteMovies;

const styles = {
  container: {
    maxWidth: 1228,
    margin: "auto",
    marginTop: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#e8e6f2",
    borderTopStyle: "solid",
    padding: "18px 12px 0 12px",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
};
