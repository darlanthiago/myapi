import { Repository } from "typeorm";
import { Role } from "@roles/entities/Role";
import { dataSource } from "@shared/typeorm";
import {
  CreateRoleDTO,
  IRolesRepository,
  PaginateParams,
  RolesPaginateProperties,
} from "./IRolesRepository";

export class RolesRepository implements IRolesRepository {
  private respository: Repository<Role>;

  public constructor() {
    this.respository = dataSource.getRepository(Role);
  }

  async create(props: CreateRoleDTO): Promise<Role> {
    const role = this.respository.create({
      name: props.name,
    });

    return await this.respository.save(role);
  }

  async save(role: Role): Promise<Role> {
    return await this.respository.save(role);
  }

  async delete(role: Role): Promise<void> {
    await this.respository.remove(role);
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<RolesPaginateProperties> {
    const [roles, count] = await this.respository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .orderBy("created_at", "DESC")
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: roles,
    };

    return result;
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.respository.findOneBy({ name });
  }

  async findById(id: string): Promise<Role | null> {
    return await this.respository.findOneBy({ id });
  }
}
