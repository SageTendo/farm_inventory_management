import { IRoleService } from "./interfaces/IRoleService.ts";
import { IRoleRepository } from "../database/interfaces/IRoleRepository.ts";
import { NewRoleDTO, RoleDTO } from "../database/schema/types.ts";
import { RoleType } from "../database/schema/constants.ts";

export class RoleService implements IRoleService {
  protected roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  async createRole(entity: NewRoleDTO): Promise<RoleDTO> {
    return await this.roleRepository.createRole(entity);
  }

  async getAllRoles(): Promise<RoleDTO[]> {
    return await this.roleRepository.getAllRoles();
  }

  async getRoleById(id: number): Promise<RoleDTO | null> {
    return await this.roleRepository.getRoleById(id);
  }

  async getRoleByType(role_type: RoleType): Promise<RoleDTO | null> {
    return await this.roleRepository.getRoleByType(role_type);
  }

  async deleteRole(id: number): Promise<void> {
    return await this.roleRepository.deleteRole(id);
  }
}
