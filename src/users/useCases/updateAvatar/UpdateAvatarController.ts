import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";

export class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);
    
    const user = await updateAvatarUseCase.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    const formattedUser = instanceToInstance(user);

    return response.status(200).json(formattedUser);
  }
}
