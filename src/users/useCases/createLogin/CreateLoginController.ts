import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { CreateLoginUseCase } from "./CreateLoginUseCase";

export class CreateLoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createLoginUseCase = container.resolve(CreateLoginUseCase);

    const { email, password } = request.body;

    const {
      user,
      access_token,
      refresh_token,
    } = await createLoginUseCase.execute({
      email,
      password,
    });

    const formattedUser = instanceToInstance({
      user,
      access_token,
      refresh_token,
    });

    return response.status(200).json(formattedUser);
  }
}
