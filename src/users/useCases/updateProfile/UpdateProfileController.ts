import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";
import { instanceToInstance } from "class-transformer";

export class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

    const { name, email, password, old_password } = request.body;
    const { id } = request.user;

    const user = await updateProfileUseCase.execute({
      user_id: id,
      name,
      email,
      password,
      old_password,
    });

    const formattedUser = instanceToInstance(user);

    return response.status(200).json(formattedUser);
  }
}
