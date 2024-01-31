import { Role } from "@roles/entities/Role";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";

type ShowRoleDTO = {
  id: string;
};

export class ShowRoleUseCase {
  constructor(private roleRepository: RolesRepository) {}

  async execute(props: ShowRoleDTO): Promise<Role> {
    const role = await this.roleRepository.findById(props.id);

    if (!role) {
      throw new AppError(`Role with id ${props.id} not found`, 404);
    }

    return role;
  }
}
