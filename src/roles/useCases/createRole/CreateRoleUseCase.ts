import { Role } from "@roles/entities/Role";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";

type CreateRoleDTO = {
  name: string;
};

export class CreateRoleUseCase {
  constructor(private roleRepository: RolesRepository) {}

  async execute(props: CreateRoleDTO): Promise<Role> {
    const roleAlreadyExists = await this.roleRepository.findByName(props.name);

    if (roleAlreadyExists) {
      throw new AppError(`Role ${props.name} already exists`, 422);
    }

    const role = await this.roleRepository.create({ name: props.name });

    return role;
  }
}
