import { RolesRepository } from "@roles/repositories/RolesRepository";
import { AppError } from "@shared/errors/AppError";

type DeleteRoleDTO = {
  id: string;
};

export class DeleteRoleUseCase {
  constructor(private roleRepository: RolesRepository) {}

  async execute(props: DeleteRoleDTO): Promise<void> {
    const role = await this.roleRepository.findById(props.id);

    if (!role) {
      throw new AppError(`Role with id ${props.id} not found`, 404);
    }

    await this.roleRepository.delete(role);
  }
}
