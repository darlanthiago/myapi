import { Role } from "@roles/entities/Role";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

type UpdateRoleDTO = {
  id: string;
  name: string;
};

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private roleRepository: IRolesRepository
  ) {}

  async execute(props: UpdateRoleDTO): Promise<Role> {
    const role = await this.roleRepository.findById(props.id);

    if (!role) {
      throw new AppError(`Role with id ${props.id} not found`, 404);
    }

    const roleAlreadyExists = await this.roleRepository.findByName(props.name);

    if (roleAlreadyExists && role.name !== props.name) {
      throw new AppError(`Role ${props.name} already exists`, 422);
    }

    role.name = props.name;

    return await this.roleRepository.save(role);
  }
}
