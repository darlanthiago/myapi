import { inject, injectable } from "tsyringe";
import { compare, hash } from "bcryptjs";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { User } from "@users/entities/Users";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export type UpdateProfileDTO = {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
};

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(props: UpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(props.user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(props.email);

    if (userUpdateEmail && userUpdateEmail.id !== props.user_id) {
      throw new AppError("There is already one user with this email", 422);
    }

    if (props.password && props.old_password) {
      const checkOldPassword = await compare(props.old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password does not match", 401);
      }

      user.password = await hash(props.password, 10);
    }

    user.name = props.name;
    user.email = props.email;

    return await this.usersRepository.save(user);
  }
}
