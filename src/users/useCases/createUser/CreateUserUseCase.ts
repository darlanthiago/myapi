import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { User } from "@users/entities/Users";
import { IUsersRepository } from "@users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  role_id: string;
};

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository
  ) {}

  async execute(props: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      props.email
    );

    if (userAlreadyExists) {
      throw new AppError("Email address already used");
    }

    const role = await this.rolesRepository.findById(props.role_id);

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    const hashedPassword = await hash(props.password, 10);

    const user = await this.usersRepository.create({
      name: props.name,
      email: props.email,
      password: hashedPassword,
      is_admin: props.is_admin,
      role,
    });

    return user;
  }
}
