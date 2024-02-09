import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { instanceToInstance } from "class-transformer";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { name, email, password, is_admin, role_id } = request.body;

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      is_admin,
      role_id,
    });

    const formattedUser = instanceToInstance(user);

    return response.status(201).json(formattedUser);
  }
}
