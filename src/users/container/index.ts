import { container } from "tsyringe";

import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersUseCaseController";
import { UpdateAvatarController } from "@users/useCases/updateAvatar/UpdateAvatarController";
import { ShowProfileController } from "@users/useCases/showProfile/ShowProfileController";
import { UpdateProfileController } from "@users/useCases/updateProfile/UpdateProfileController";
import { RefreshTokenRepository } from "@users/repositories/RefreshTokenRepository";

import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IRefreshTokenRepository>(
  "RefreshTokenRepository",
  RefreshTokenRepository
);

container.registerSingleton("CreateUserController", CreateUserController);
container.registerSingleton("ListUsersController", ListUsersController);
container.registerSingleton("CreateLoginController", CreateLoginController);
container.registerSingleton("UpdateAvatarController", UpdateAvatarController);
container.registerSingleton("ShowPofileController", ShowProfileController);
container.registerSingleton("UpdatePofileController", UpdateProfileController);
