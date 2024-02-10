import { NextFunction, Request, Response } from "express";
import { Secret, decode, verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

import authConfig from "@config/auth";

type JwtPayloadProps = {
  sub: string;
};

export const addUserInfoToRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Access token is required",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Access token is required",
    });
  }

  try {
    const decodedToken = decode(token);
    const { sub } = decodedToken as JwtPayloadProps;
    req.user = { id: sub };
    return next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Access token is required",
    });
  }
};
