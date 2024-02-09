import { Request, Response, Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";

import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersUseCaseController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";

const usersRouter = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      is_admin: Joi.boolean().required(),
      role_id: Joi.string().uuid().required(),
    },
  }),
  (req: Request, res: Response) => {
    return createUserController.handle(req, res);
  }
);

usersRouter.get(
  "/",
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req: Request, res: Response) => {
    return listUsersController.handle(req, res);
  }
);

usersRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (req: Request, res: Response) => {
    return createLoginController.handle(req, res);
  }
);

export { usersRouter };
