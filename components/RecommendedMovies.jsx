import { useEffect, useState } from "react";
import getFavoriteMovies from "@/utils/get-favourite-movies";
import "react-alice-carousel/lib/alice-carousel.css";
import MovieSlider from "./MovieSlider";
import { useSession } from "next-auth/react";
import getRecommendedMovies from "@/utils/recommended-movies";

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const { email } = session.user;
      getFavoriteMovies(email, setMovies);
    }
  }, [session]);

  useEffect(() => {
    if (movies.length > 0) {
      getRecommendedMovies(movies, setRecommendedMovies);
      console.log(movies);
    }
  }, [movies]);

  if (!recommendedMovies) return;
  if (!session) return null;

  return (
    <div style={styles.container}>
      <MovieSlider title="Recommended Movies" movies={recommendedMovies} />
    </div>
  );
};

export default RecommendedMovies;

const styles = {
  container: {
    maxWidth: 1228,
    margin: "auto",
    marginTop: 24,
    padding: "18px 12px 0 12px",
  },
};
