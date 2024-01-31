import { Role } from "@roles/entities/Role";
import { dataSource } from "@shared/typeorm";
import { Repository } from "typeorm";

type CreateRoleDTO = {
  name: string;
};

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
};

export type RolesPaginateProperties = {
  per_page: number;
  total: number;
  current_page: number;
  data: Role[];
};

export class RolesRepository {
  private respository: Repository<Role>;

  private static INSTANCE: RolesRepository;

  private constructor() {
    this.respository = dataSource.getRepository(Role);
  }

  public static getInstance(): RolesRepository {
    if (!RolesRepository.INSTANCE) {
      RolesRepository.INSTANCE = new RolesRepository();
    }

    return RolesRepository.INSTANCE;
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
