const movieId = async (id, setMovie) => {
  console.log(id);
  const themoviedbURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_KEY}`;
  //   if (!setMovie || !id) {
  //     return console.error("setMovie and id are required at'utils/movie-id");
  //   }

  fetch(themoviedbURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      setMovie(data);
    })
    .catch((error) => {
      console.error("Error getting the movie 'utils/movie-id':", error);
    });
};

export default movieId;
