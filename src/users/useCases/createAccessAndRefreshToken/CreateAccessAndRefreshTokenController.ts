import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";
import { CreateAccessAndRefreshTokenUseCase } from "./CreateAccessAndRefreshTokenUseCase";

export class CreateAccessAndRefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createAccessAndRefreshTokenUseCase = container.resolve(
      CreateAccessAndRefreshTokenUseCase
    );

    const { refresh_token } = request.body;
    const { id } = request.user;

    const accessAndRefreshToken = await createAccessAndRefreshTokenUseCase.execute(
      {
        user_id: id,
        refresh_token,
      }
    );

    const formattedUser = instanceToInstance({
      user: accessAndRefreshToken.user,
      access_token: accessAndRefreshToken.access_token,
      refresh_token: accessAndRefreshToken.refresh_token,
    });

    return response.status(201).json(formattedUser);
  }
}
