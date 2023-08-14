import { SessionProvider } from "next-auth/react";
import TopNav from "@/components/TopNav";
import "./global.css";
import PopularMovies from "@/components/PopularMovies";
import FavoriteMovies from "@/components/FavoriteMovies";
import RecommendedMovies from "@/components/RecommendedMovies";

function HomePage() {
  return (
    <SessionProvider>
      <TopNav />
      {/* <FeaturedMovie/> */}
      <PopularMovies />
      <RecommendedMovies />
      <FavoriteMovies />
    </SessionProvider>
  );
}

export default HomePage;
