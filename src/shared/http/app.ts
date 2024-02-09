import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { errors } from "celebrate";

import { route } from "./routes";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import uploadConfig from "@config/upload";

import "@shared/container";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(route);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(error);

    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: "error", message: error.message });
    }

    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
);

export { app };
