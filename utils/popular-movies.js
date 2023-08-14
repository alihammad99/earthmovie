const popularMovies = async (setMovies, page = 1) => {
  const themoviedbURL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_KEY}&page=${page}`;

  fetch(themoviedbURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      if (!setMovies)
        return console.error("setMovies is required at'utils/popular-movies");

      setMovies(data.results);
    })
    .catch((error) => {
      console.error("Error getting the user 'utils/popular-movies':", error);
    });
};

export default popularMovies;
