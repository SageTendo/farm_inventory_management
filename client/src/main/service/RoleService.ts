import { IRoleService } from "./interfaces/IRoleService";
import { IRoleRepository } from "../database/interfaces/IRoleRepository";
import { NewRoleDTO, RoleDTO } from "../database/schema/types";
import { RoleType } from "../database/schema/constants";

export class RoleService implements IRoleService {
  protected roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  async create(entity: NewRoleDTO): Promise<RoleDTO> {
    return await this.roleRepository.create(entity);
  }

  async getAll(): Promise<RoleDTO[]> {
    return await this.roleRepository.getAll();
  }

  async getById(roleId: string): Promise<RoleDTO | null> {
    return await this.roleRepository.getById(roleId);
  }

  async getByType(role_type: RoleType): Promise<RoleDTO | null> {
    return await this.roleRepository.getByType(role_type);
  }

  async delete(roleId: string): Promise<void> {
    return await this.roleRepository.delete(roleId);
  }
}
