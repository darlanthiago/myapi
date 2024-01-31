import "dotenv/config";
import "reflect-metadata";
import { app } from "./app";
import { dataSource } from "@shared/typeorm";

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.NODE_PORT, () => {
      console.log(`Server listening on port ${process.env.NODE_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
