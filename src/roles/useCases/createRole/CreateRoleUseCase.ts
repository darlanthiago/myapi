import { inject, injectable } from "tsyringe";
import { Role } from "@roles/entities/Role";
import { AppError } from "@shared/errors/AppError";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";

type CreateRoleDTO = {
  name: string;
};

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private roleRepository: IRolesRepository
  ) {}

  async execute(props: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExists = await this.roleRepository.findByName(props.name);

    if (roleAlreadyExists) {
      throw new AppError(`Role ${props.name} already exists`, 422);
    }

    const role = await this.roleRepository.create({ name: props.name });

    return role;
  }
}
