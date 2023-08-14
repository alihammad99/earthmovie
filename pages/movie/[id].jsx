import TopNav from "@/components/TopNav";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../global.css";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import movieId from "@/utils/movie-id";
import FavoriteButton from "@/components/FavoriteButton";
const movie = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState({});
  const path = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (id) {
      movieId(id, setMovie);
    }
  }, [id]);
  useEffect(() => {
    if (movie) {
      console.log(movie);
    }
  }, [movie]);

  if (!width) return;

  return (
    <>
      <TopNav />

      <div className="row" style={styles.container}>
        {!movie.id ? (
          <p>Loading...</p>
        ) : (
          <>
            <div style={width < 650 ? { padding: 18, marginTop: 12 } : {}}>
              {width < 650 && <Image src={path} height={540} width={width} />}
              <div className="row" style={width < 650 ? { marginTop: 18 } : {}}>
                <div className="row">
                  <Image src="/star.svg" width={24} height={24} />
                  <p>
                    {Number(movie.vote_average).toFixed(1)} ({movie.vote_count}
                    voter)
                  </p>
                </div>
                <div className="row">
                  <Image src="/calendar.svg" width={24} height={24} />
                  <p>{movie.release_date}</p>
                </div>
              </div>
              <div style={width > 650 ? { width: 580 } : { width: width - 24 }}>
                <h1 style={styles.title}>{movie.original_title}</h1>
                <p
                  style={
                    width > 650
                      ? { ...styles.description, width: 440 }
                      : styles.description
                  }
                >
                  {movie.overview}
                </p>
              </div>
              <div style={styles.button}>
                {session && (
                  <FavoriteButton
                    poster={movie.poster_path}
                    movieId={id}
                    title={movie.title}
                    genreIds={movie.genres}
                  />
                )}
              </div>
            </div>
            {width >= 650 && <Image src={path} height={540} width={382} />}
          </>
        )}
      </div>
    </>
  );
};

export default movie;

const styles = {
  container: {
    maxWidth: 1228,
    width: "100%",
    margin: "auto",
    marginTop: 90,
    justifyContent: "space-between",
  },

  title: { fontSize: 48, marginTop: 18, marginBottom: 42 },
  description: {
    color: "#676A87",
    fontSize: 16,
    // width: 440,
  },
  button: {
    marginTop: 24,
    marginBottom: 30,
  },
};
