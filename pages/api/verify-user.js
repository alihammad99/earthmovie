import dbConnect from "../../utils/db";
import User from "../../utils/mongoose";

export default async (req, res) => {
  await dbConnect();
  try {
    const { name, email } = req.body; 

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        favoriteMovies: [],
      });
      await user.save();
      return res.json({ status: "ok", message: "user created successfully" });
    }
    res.json({ status: "ok", message: "user found successfully" });

  } catch (error) {
    console.error("Error in /api/verify-user:", error);
    res.status(500).json({ error: "An error occurred while getting the user" });
  }
};
