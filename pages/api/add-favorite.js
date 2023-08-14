import dbConnect from "../../utils/db";
import User from "../../utils/mongoose";

export default async (req, res) => {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const { movieId, title, email, poster, genre_ids } = req.body;

      // First, find the user
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .send({ status: "error", message: "user not found" });
      }

      // Check if the movieId already exists in the favoriteMovies list
      const movieExists = user.favoriteMovies.some(
        (movie) => movie.movieId === movieId
      );
      let response;

      // If the movie exists, remove it, otherwise add it
      if (movieExists) {
        const movieToRemove = user.favoriteMovies.find(
          (movie) => movie.movieId === movieId
        );
        await User.findOneAndUpdate(
          { email },
          { $pull: { favoriteMovies: { movieId } } },
          { new: true }
        );
        response = { status: "removed", movie: movieToRemove };
      } else {
        const movieToAdd = { movieId, title, poster, genre_ids };
        await User.findOneAndUpdate(
          { email, "favoriteMovies.movieId": { $nin: [movieId] } },
          { $push: { favoriteMovies: movieToAdd } },
          { new: true }
        );
        response = { status: "added", movie: movieToAdd };
      }

      // Return the response
      res.json(response);
    } catch (error) {
      console.error("Error in /api/add-favorite:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the favorite list" });
    }
  } else {
    res.status(405).end();
  }
};
