import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { AuthRequest } from "../types";

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  // Attach user ID to request
  req.user = { id: decoded.userId };
  next();
};
