import React from "react";
import MovieCard from "./MovieCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "next/image";

const MovieSlider = ({ title, movies }) => {
  const responsive = {
    0: { items: 2.15 },
    568: { items: 4.5 },
    1024: { items: 7.1 },
  };

  const list = movies.map((movie) => (
    <MovieCard
      key={movie.id}
      movieId={movie.id || movie.movieId}
      poster={movie.poster_path || movie.poster}
    />
  ));
  return (
    <div style={styles.list}>
      <h3>{title}</h3>
      <AliceCarousel
        responsive={responsive}
        // autoWidth
        mouseTracking
        items={list}
        // disableButtonsControls
        disableDotsControls
        touchTracking
        renderNextButton={SlideNext}
        renderPrevButton={SlideBack}
        animationType="fadeout"
      />
    </div>
  );
};
const SlideNext = () => <SlideButton next />;
const SlideBack = () => <SlideButton />;

const SlideButton = ({ next }) => {
  return (
    <button
      style={next ? styles.slideButton : { ...styles.slideButton, right: 66 }}
    >
      {next ? (
        <Image src="/arrow-right.svg" width={6} height={10} />
      ) : (
        <Image src="/arrow-left.svg" width={6} height={10} />
      )}
    </button>
  );
};

export default MovieSlider;

const styles = {
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    position: "relative",
  },
  slideButton: {
    position: "absolute",
    top: -48,
    right: 0,
    cursor: "pointer",
    padding: "12px 24px",
    backgroundColor: "rgba(231, 29, 96, 0.08)",
    borderRadius: 4,
  },
};
