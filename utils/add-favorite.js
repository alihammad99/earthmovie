const addFavorite = (email, movieId, title, poster, genre_ids, setResponse) => {
  fetch("/api/add-favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, movieId, title, poster, genre_ids }),
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "added") {
        setResponse(true);
      } else if (data.status === "removed") {
        setResponse(false);
      }
    })
    .catch((error) => {
      console.error("Error adding favorite:", error);
    });
};
export default addFavorite;
