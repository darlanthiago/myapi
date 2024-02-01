import { inject, injectable } from "tsyringe";
import { IRolesRepository } from "@roles/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";

type DeleteRoleDTO = {
  id: string;
};

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private roleRepository: IRolesRepository
  ) {}

  async execute(props: DeleteRoleDTO): Promise<void> {
    const role = await this.roleRepository.findById(props.id);

    if (!role) {
      throw new AppError(`Role with id ${props.id} not found`, 404);
    }

    await this.roleRepository.delete(role);
  }
}
