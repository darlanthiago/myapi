import { Request, Response, Router } from "express";

import { rolesRouter } from "@roles/http/routes/roles.routes";
import { usersRouter } from "@users/http/routes/users.routes";

import { version, name } from "../../../../package.json";

const route = Router();
route.use("/roles", rolesRouter);
route.use("/users", usersRouter);

route.get("/", (request: Request, response: Response) => {
  const metadata = {
    title: name,
    version: version,
    node_version: process.versions.node,
  };

  return response.json(metadata);
});

export { route };
