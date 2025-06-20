import { RoleType } from "../schema/constants";
import { NewRoleDTO, RoleDTO } from "../schema/types";

/**
 * Interface for role repository
 */
export interface IRoleRepository {
  /**
   * Creates a new role
   * @param {NewRoleDTO} entity A new role to be inserted into the database
   * @returns {Promise<RoleDTO>} A promise that resolves to the created role entity
   */
  createRole(entity: NewRoleDTO): Promise<RoleDTO>;

  /**
   * Retrieves all roles from the database
   * @param {number} [limit=10] The maximum number of roles to retrieve
   * @param {number} [offset=0] The number of roles to skip before retrieving
   * @returns {Promise<RoleDTO[]>} A promise that resolves to an array of role entities
   */
  getAllRoles(limit?: number, offset?: number): Promise<RoleDTO[]>;

  /**
   * Retrieves a role by its ID
   * @param {number} id The ID of the role to retrieve
   * @returns {Promise<RoleDTO | null>} A promise that resolves to the role entity if found, otherwise null
   */
  getRoleById(id: number): Promise<RoleDTO | null>;

  /**
   * Retrieves a role by its type
   * @param {RoleType} type The type of the role to retrieve
   * @returns {Promise<RoleDTO | null>} A promise that resolves to the role entity if found, otherwise null
   */
  getRoleByType(type: RoleType): Promise<RoleDTO | null>;

  /**
   * Deletes a role by its ID
   * @param {number} id The ID of the role to delete
   * @returns {Promise<void>} A promise that resolves when the role is deleted
   */
  deleteRole(id: number): Promise<void>;
}
