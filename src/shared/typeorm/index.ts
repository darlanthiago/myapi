import "dotenv/config";

import { DataSource } from "typeorm";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { Role } from "@roles/entities/Role";
import { User } from "@users/entities/Users";

import { CreateRolesTable1706279650811 } from "./migrations/1706279650811-CreateRolesTable";
import { UsersTable1707270238021 } from "./migrations/1707270238021-UsersTable";
import { AddRoleIdToUsersTable1707270574917 } from "./migrations/1707270574917-AddRoleIdToUsersTable";

const dataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Role, User],
  migrations: [
    CreateRolesTable1706279650811,
    UsersTable1707270238021,
    AddRoleIdToUsersTable1707270574917,
  ],
  namingStrategy: new SnakeNamingStrategy(),
});

export { dataSource };
