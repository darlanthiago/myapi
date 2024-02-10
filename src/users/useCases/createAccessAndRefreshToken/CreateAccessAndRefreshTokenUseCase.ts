import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User } from "@users/entities/Users";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import jwtConfig from "@config/auth";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";

export type CreateAccessAndRefreshTokenDTO = {
  user_id: string;
  refresh_token: string;
};

type IResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
};

@injectable()
export class CreateAccessAndRefreshTokenUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(props: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(props.user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const refreshTokenExists = await this.refreshTokenRepository.findByToken(
      props.refresh_token
    );

    if (!refreshTokenExists) {
      throw new AppError("Refresh token is required", 401);
    }

    const dateNow = new Date().getTime();

    if (
      !refreshTokenExists.valid ||
      refreshTokenExists.expires.getTime() < dateNow
    ) {
      throw new AppError("Refresh token is invalid/expired", 401);
    }

    await this.refreshTokenRepository.invalidate(refreshTokenExists);

    const accessToken = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    const expires = new Date(
      Date.now() + jwtConfig.refresh_token.refreshDuration
    );

    const refreshToken = sign({}, jwtConfig.refresh_token.secret, {
      subject: user.id,
      expiresIn: jwtConfig.refresh_token.expiresIn,
    });

    await this.refreshTokenRepository.create({
      user_id: user.id,
      token: refreshToken,
      expires,
      valid: true,
    });

    return { user, access_token: accessToken, refresh_token: refreshToken };
  }
}
