import { RolesRepository } from "@roles/repositories/RolesRepository";
import { ShowRoleUseCase } from "./ShowRoleUseCase";
import { ShowRoleController } from "./ShowRoleController";

const rolesRepository = RolesRepository.getInstance();

const showRoleUseCase = new ShowRoleUseCase(rolesRepository);

const showRoleController = new ShowRoleController(showRoleUseCase);

export { showRoleController };
