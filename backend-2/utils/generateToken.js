import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export default function generateToken(user) {
  return jwt.sign(
    {
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    },
      process.env.JWT_SECRET,
    { expiresIn: "2h" });
}

