import "dotenv/config";

import { DataSource } from "typeorm";
import { CreateRolesTable1706279650811 } from "./migrations/1706279650811-CreateRolesTable";
import { Role } from "@roles/entities/Role";

const dataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Role],
  migrations: [CreateRolesTable1706279650811],
});

export { dataSource };
