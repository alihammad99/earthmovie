import React from "react";
import Link from "next/link";

const ViewButton = ({ movieId }) => {
  return (
    <Link href={`/movie/${movieId}`}>
      <button className="btn-primary" style={styles.button}>
        View Now
      </button>
    </Link>
  );
};

export default ViewButton;

const styles = {
  button: {
    width: 160,
  },
};
