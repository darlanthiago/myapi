import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

import authConfig from "@config/auth";

type JwtPayloadProps = {
  sub: string;
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Failed to verify authorization header", 401);
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToken as JwtPayloadProps;
    req.user = { id: sub };
    return next();
  } catch (error) {
    throw new AppError("Failed to verify token", 401);
  }
};
