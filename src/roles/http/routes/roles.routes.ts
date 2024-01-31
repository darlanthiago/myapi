import { Request, Response, Router, response } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { createRoleController } from "@roles/useCases/createRole";
import { deleteRoleController } from "@roles/useCases/deleteRole";
import { listRolesController } from "@roles/useCases/listRoles";
import { showRoleController } from "@roles/useCases/showRole";
import { updateRoleController } from "@roles/useCases/updateRole";

const rolesRouter = Router();

rolesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (req: Request, res: Response) => {
    return createRoleController.handle(req, res);
  }
);

rolesRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req: Request, res: Response) => {
    return listRolesController.handle(req, res);
  }
);

rolesRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (req: Request, res: Response) => {
    return showRoleController.handle(req, res);
  }
);

rolesRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (req: Request, res: Response) => {
    return updateRoleController.handle(req, res);
  }
);

rolesRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (req: Request, res: Response) => {
    return deleteRoleController.handle(req, res);
  }
);

export { rolesRouter };
