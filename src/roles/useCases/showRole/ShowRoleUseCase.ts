import { Role } from "@roles/entities/Role";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

type ShowRoleDTO = {
  id: string;
};

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private roleRepository: IRolesRepository
  ) {}

  async execute(props: ShowRoleDTO): Promise<Role> {
    const role = await this.roleRepository.findById(props.id);

    if (!role) {
      throw new AppError(`Role with id ${props.id} not found`, 404);
    }

    return role;
  }
}
