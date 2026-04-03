import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = process.env.JWT_SECRET

export function authMiddleware(req, res, next) {
  let token = req.headers.authorization;

  console.log("HEADERS:", req.headers.authorization);

  if (token) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    console.log("DECODED:", decoded);
    req.user = {
      _id: decoded.data._id};
  } catch (e) {
    return res.status(401).json({ message: "Invalid token!" });
  }

  next();
}