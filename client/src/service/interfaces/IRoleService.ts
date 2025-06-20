import { NewRoleDTO, RoleDTO } from "../../database/schema/types.ts";
import { RoleType } from "../../database/schema/constants.ts";

export interface IRoleService {
  /**
   * Create a new role
   * @param entity A new role to be inserted into the database
   * @returns A promise that resolves to the created role entity
   */
  createRole(entity: NewRoleDTO): Promise<RoleDTO>;

  /**
   * Get all roles
   * @returns A promise that resolves to an array of role entities
   */
  getAllRoles(): Promise<RoleDTO[]>;

  /**
   * Get role by its ID
   * @param id The ID of the role to retrieve
   * @returns A promise that resolves to the role entity
   */
  getRoleById(id: number): Promise<RoleDTO | null>;

  /**
   * Get role by its type
   * @param role_type The type of the role to retrieve
   * @returns A promise that resolves to the role entity
   */
  getRoleByType(role_type: RoleType): Promise<RoleDTO | null>;

  /**
   * Delete role by its ID
   * @param id The ID of the role to delete
   * @returns A promise that resolves when the role is deleted
   */
  deleteRole(id: number): Promise<void>;
}
