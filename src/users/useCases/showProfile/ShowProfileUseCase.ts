import { inject, injectable } from "tsyringe";
import { User } from "@users/entities/Users";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export type ShowProfileParams = {
  user_id: string;
};

@injectable()
export class ShowProfilerUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(props: ShowProfileParams): Promise<User> {
    const user = await this.usersRepository.findById(props.user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}
