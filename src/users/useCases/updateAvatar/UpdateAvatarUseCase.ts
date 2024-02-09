import { inject, injectable } from "tsyringe";
import path from "node:path";
import fs from "node:fs";
import { hash } from "bcryptjs";
import { User } from "@users/entities/Users";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import uploadConfig from "@config/upload";

export type UpdateAvatarDTO = {
  userId: string;
  avatarFilename: string;
};

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(props: UpdateAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(props.userId);

    if (!user) {
      throw new AppError("Only one user can change avatar", 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = props.avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}
