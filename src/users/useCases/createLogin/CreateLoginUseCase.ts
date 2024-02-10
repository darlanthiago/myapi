import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User } from "@users/entities/Users";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import jwtConfig from "@config/auth";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";

export type CreateLoginDTO = {
  email: string;
  password: string;
};

type IResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
};

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(props: CreateLoginDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(props.email);

    if (!user) {
      throw new AppError("E-mail/Password does not match", 401);
    }

    const passwordConfirmed = await compare(props.password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("E-mail/Password does not match", 401);
    }

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
