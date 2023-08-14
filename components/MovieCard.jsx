import React from "react";
import ViewButton from "./ViewButton";
import Image from "next/image";

const MovieCard = ({ poster, movieId }) => {
  const path = `https://image.tmdb.org/t/p/original${poster}`;
  const placeholder = `https://image.tmdb.org/t/p/w200${poster}`;

  return (
    <div style={styles.container}>
      <Image
        style={styles.poster}
        src={path}
        // height={200}
        alt="Poster"
        fill
        quality={70}
        sizes={300}
        placeholder="blur"
        blurDataURL={placeholder}
      />
      <div style={styles.button}>
        <ViewButton movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieCard;

const styles = {
  container: {
    height: 250,
    // backgroundColor: "#edeef8",
    width: 160,
    overflow: "hidden",
    position: "relative",
  },
  poster: {
    position: "absolute",
    zIndex: -1,
  },
  button: {
    position: "absolute",
    bottom: 0,
  },
};
