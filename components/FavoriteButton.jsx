import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import addFavorite from "../utils/add-favorite";
import getFavoriteMovies from "../utils/get-favourite-movies";

const FavoriteButton = ({ movieId, title, poster, genreIds }) => {
  const { data: session } = useSession();
  const email = session.user.email;

  const [favoriteMovie, setFavoriteMovie] = useState(null);

  if (!email) return null;

  useEffect(() => {
    if (email) {
      getFavoriteMovies(email, setFavoriteMovie, movieId);
    }
  }, [session]);

  if (favoriteMovie === null) return <p>Loading ...</p>;

  return (
    <button
      onClick={() =>
        addFavorite(email, movieId, title, poster, genreIds, setFavoriteMovie)
      }
      className={favoriteMovie ? "btn-secondary" : "btn-primary"}
    >
      {favoriteMovie ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
