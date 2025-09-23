import { NewRoleDTO, RoleDTO } from "../../../shared/dto/role";
import { UserRoleType } from "../../../shared/types";

/**
 * Interface for role repository
 */
export interface IRoleRepository {
  /**
   * Creates a new role
   * @param {NewRoleDTO} entity A new role to be inserted into the database
   * @returns {Promise<RoleDTO>} A promise that resolves to the created role entity
   */
  create(entity: NewRoleDTO): Promise<RoleDTO>;

  /**
   * Retrieves all roles from the database
   * @param {number} [limit=10] The maximum number of roles to retrieve
   * @param {number} [offset=0] The number of roles to skip before retrieving
   * @returns {Promise<RoleDTO[]>} A promise that resolves to an array of role entities
   */
  getAll(limit?: number, offset?: number): Promise<RoleDTO[]>;

  /**
   * Retrieves a role by its ID
   * @param {number} roleId The ID of the role to retrieve
   * @returns {Promise<RoleDTO | null>} A promise that resolves to the role entity if found, otherwise null
   */
  getById(roleId: string): Promise<RoleDTO | null>;

  /**
   * Retrieves a role by its type
   * @param {RoleType} type The type of the role to retrieve
   * @returns {Promise<RoleDTO | null>} A promise that resolves to the role entity if found, otherwise null
   */
  getByType(type: UserRoleType): Promise<RoleDTO | null>;

  /**
   * Deletes a role by its ID
   * @param {number} roleId The ID of the role to delete
   * @returns {Promise<void>} A promise that resolves when the role is deleted
   */
  delete(roleId: string): Promise<void>;
}
