import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { ShowProfilerUseCase } from "./ShowProfileUseCase";

export class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showProfileUseCase = container.resolve(ShowProfilerUseCase);

    const { id } = request.user;

    const user = await showProfileUseCase.execute({ user_id: id });

    const formattedUser = instanceToInstance(user);

    return response.status(200).json(formattedUser);
  }
}
