import dbConnect from "../../utils/db";
import User from "../../utils/mongoose";

export default async (req, res) => {
  await dbConnect();
  try {
    const { email, movieId } = req.body; // Details of the movie to add

    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ status: "error", message: "user not found" });
    }
    if (movieId) {
      // Check if the user's favorite movies include the specified movieId
      const hasMovie = user.favoriteMovies.some(
        (movie) => movie.movieId === movieId
      );
      return res.json({ hasMovie });
    }
    return res.json(user.favoriteMovies);
  } catch (error) {
    console.error("Error in /api/get-favourite-movies:", error);
    res.status(500).json({ error: "An error occurred while getting the user" });
  }
};
