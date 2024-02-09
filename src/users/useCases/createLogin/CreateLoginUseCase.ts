import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { User } from "@users/entities/Users";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import jwtConfig from "@config/auth";

export type CreateLoginDTO = {
  email: string;
  password: string;
};

type IResponse = {
  user: User;
  token: string;
};

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
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

    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
