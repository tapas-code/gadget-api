import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined.");
}

// ✅ Generate a JWT Token
export const generateToken = (userId: string): string => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// ✅ Verify JWT Token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
