import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  favoriteMovies: [
    {
      movieId: String,
      title: String,
      poster: String,
      genre_ids: [],
    },
  ],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
