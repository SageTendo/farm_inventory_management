import { IRoleService } from "./interfaces/IRoleService";
import { IRoleRepository } from "../database/interfaces/IRoleRepository";
import { UserRoleType, userRoleTypes } from "../../shared/types";
import { NewRoleDTO, RoleDTO } from "../../shared/dto/role";

export class RoleService implements IRoleService {
  protected roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  async populateDefaultRoles(): Promise<void> {
    for (const role of userRoleTypes) {
      const existingRole = await this.roleRepository.getByType(role);
      if (!existingRole) {
        await this.roleRepository.create({
          type: role,
        });
      }
    }
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

  async getByType(role_type: UserRoleType): Promise<RoleDTO | null> {
    return await this.roleRepository.getByType(role_type);
  }

  async delete(roleId: string): Promise<void> {
    return await this.roleRepository.delete(roleId);
  }
}
