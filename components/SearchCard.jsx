import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchCard = ({
  title = "Most Popular",
  rate = "5.5",
  poster = "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  movieId,
  setText,
}) => {
  const path = `https://image.tmdb.org/t/p/w200${poster}`;
  return (
    <div style={styles.container}>
      <Link
        onClick={() => setText("")}
        href={`/movie/${movieId}`}
        style={styles.poster}
      >
        <Image src={path} width={48} height={58} alt="Poster" />
      </Link>
      <div style={styles.contentBox}>
        {title.length > 22 ? (
          <Link
            onClick={() => setText("")}
            href={`/movie/${movieId}`}
            style={styles.title}
          >
            {title.substring(0, 22)}..
          </Link>
        ) : (
          <Link
            onClick={() => setText("")}
            href={`/movie/${movieId}`}
            style={styles.title}
          >
            {title}
          </Link>
        )}
        <div style={styles.rateBox}>
          <Image src="/star.svg" width={24} height={24} alt="Rate icon" />
          <p>{rate}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: 58,
    width: 270,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: "1px solid #D3D4E7",
    alignItems: "flex-start",
    gap: 12,
    cursor: "pointer",
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  poster: { width: 48, height: 58, overflow: "hidden" },
  title: {
    color: "#2C2E41",
    fontSize: 16,
  },
  rateBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    color: "#6C6E77",
    fontSize: 16,
  },
};
