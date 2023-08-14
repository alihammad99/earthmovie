const getFavoriteMovies = async (email, setMovies, movieId) => {
  fetch("/api/get-favorite-movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieId ? { email, movieId } : { email }),
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((data) => {
      if (movieId) {
        setMovies(data.hasMovie);
      } else {
        setMovies(data);
      }
    })
    .catch((error) => {
      console.error(
        "Error getting the user 'utils/get-favourite-movies':",
        error
      );
    });
};

export default getFavoriteMovies;
