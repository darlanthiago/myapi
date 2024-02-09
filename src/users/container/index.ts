import { container } from "tsyringe";

import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { UsersRepository } from "@users/repositories/UsersRepository";
import { CreateLoginController } from "@users/useCases/createLogin/CreateLoginController";
import { CreateUserController } from "@users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@users/useCases/listUsers/ListUsersUseCaseController";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton("CreateUserController", CreateUserController);
container.registerSingleton("ListUsersController", ListUsersController);
container.registerSingleton("CreateLoginController", CreateLoginController);