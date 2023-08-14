const recommendedMovies = (favoriteMovies, setMovies) => {
  const genres = getTopThreeGenres(favoriteMovies).join(",");

  const themoviedbURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_KEY}&with_genres=${genres}`;
  fetch(themoviedbURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!setMovies)
        return console.error(
          "setMovies is required at'utils/recommended-movies"
        );

      setMovies(data.results);
    })
    .catch((error) => {
      console.error(
        "Error getting the user 'utils/recommended-movies':",
        error
      );
    });
};

const getTopThreeGenres = (favoriteMovies) => {
  let genreCounts = {};

  favoriteMovies.forEach((movie) => {
    for (const genre of movie.genre_ids) {
      genreCounts[genre.id] = (genreCounts[genre.id] || 0) + 1;
    }
  });

  let genrePairs = Object.entries(genreCounts);
  genrePairs.sort((a, b) => b[1] - a[1]);

  let topThreeGenres = genrePairs.slice(0, 3).map((pair) => parseInt(pair[0]));
  return topThreeGenres;
};

export default recommendedMovies;
