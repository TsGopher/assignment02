import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req.headers.authorization;

      if (!authToken || !authToken.startsWith("Bearer ")) {
        res.status(401).json({
          message: "You're not allowed to make request",
        });
      }

      const token = authToken?.split(" ")[1];

      const decoded = jwt.verify(
        token as string,
        config.jwt_secret as string
      ) as JwtPayload;

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).json({
          error: "unauthorized",
        });
      }

      return next();
    } catch (error: any) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default auth;
