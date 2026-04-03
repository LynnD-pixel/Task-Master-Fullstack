import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export default function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  
  return jwt.sign(payload, secret, { expiresIn: "2h" });
}

