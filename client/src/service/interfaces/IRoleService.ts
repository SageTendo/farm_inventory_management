import { NewRoleDTO, RoleDTO } from "../../database/schema/types";
import { RoleType } from "../../database/schema/constants";

export interface IRoleService {
  /**
   * Create a new role
   * @param entity A new role to be inserted into the database
   * @returns A promise that resolves to the created role entity
   */
  create(entity: NewRoleDTO): Promise<RoleDTO>;

  /**
   * Get all roles
   * @returns A promise that resolves to an array of role entities
   */
  getAll(): Promise<RoleDTO[]>;

  /**
   * Get role by its ID
   * @param id The ID of the role to retrieve
   * @returns A promise that resolves to the role entity
   */
  getById(roleId: string): Promise<RoleDTO | null>;

  /**
   * Get role by its type
   * @param role_type The type of the role to retrieve
   * @returns A promise that resolves to the role entity
   */
  getByType(role_type: RoleType): Promise<RoleDTO | null>;

  /**
   * Delete role by its ID
   * @param id The ID of the role to delete
   * @returns A promise that resolves when the role is deleted
   */
  delete(roleId: string): Promise<void>;
}
