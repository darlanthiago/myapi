import { Request, Response } from "express";
import { DeleteRoleUseCase } from "./DeleteRoleUseCase";
import { container } from "tsyringe";

export class DeleteRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase);

    const { id } = request.params;

    const role = await deleteRoleUseCase.execute({ id });

    return response.status(204).json(role);
  }
}
