import { Request, Response, Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { container } from "tsyringe";
import multer from "multer";

import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersUseCaseController";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";

import uploadConfig from "@config/upload";
import { UpdateAvatarController } from "@users/useCases/updateAvatar/UpdateAvatarController";
import { ShowProfileController } from "@users/useCases/showProfile/ShowProfileController";

const usersRouter = Router();

const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);
const showProfiletarController = container.resolve(ShowProfileController);

const upload = multer(uploadConfig);

usersRouter.post(
  "/",
  isAuthenticated,
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

usersRouter.get("/profile", isAuthenticated, (req: Request, res: Response) => {
  return showProfiletarController.handle(req, res);
});

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

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  (req: Request, res: Response) => {
    return updateAvatarController.handle(req, res);
  }
);

export { usersRouter };
