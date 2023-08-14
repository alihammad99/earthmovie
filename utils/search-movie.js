const searchMovie = async (title, setList) => {
  const themoviedbURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_KEY}&query=${title}`;

  fetch(themoviedbURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (!setList)
        return console.error("setList is required at'utils/search-movie");

      const list = [];
      data.results.forEach((item) => {
        if (list.length === 6) return;
        if (item.poster_path) {
          list.push(item);
        }
      });
      setList(list);
    })
    .catch((error) => {
      console.error("Error getting the user 'utils/search-movie':", error);
    });
};

export default searchMovie;
