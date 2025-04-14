import { NewUserDTO, UpdateUserDTO, UserDTO } from "../schema/types";

/**
 * Interface for user repository
 */
export interface IUserRepository {
  /**
   * Creates a new user
   * @param {NewUserDTO} entity A new user to be inserted into the database
   * @returns {Promise<UserDTO>} A promise that resolves to the created user entity
   */
  createUser(entity: NewUserDTO): Promise<UserDTO>;

  /**
   * Retrieves all users from the database
   * @param {number} limit The maximum number of users to retrieve (defaults to 10)
   * @param {number} offset The number of users to skip before retrieving the first user
   * @returns {Promise<UserDTO[]>} A promise that resolves to an array of user entities
   */
  getAllUsers(limit?: number, offset?: number): Promise<UserDTO[]>;

  /**
   * Retrieves a user by their username
   * @param username The username of the user to retrieve
   * @returns A promise that resolves to the user entity if found, otherwise null
   */
  getUserByUsername(username: string): Promise<UserDTO | null>;

  /**
   * Retrieves a user by their id
   * @param id The id of the user to retrieve
   * @returns A promise that resolves to the user entity if found, otherwise null
   */

  getUserById(id: number): Promise<UserDTO | null>;

  /**
   * Updates a user by their id
   * @param id The id of the user to update
   * @param entity The updated user entity
   * @returns A promise that resolves to the updated user entity if found, otherwise null
   */
  updateUser(id: number, entity: UpdateUserDTO): Promise<UserDTO | null>;

  /**
   * Deletes a user by their id
   * @param id The id of the user to delete
   * @returns A promise that resolves when the user is deleted
   */
  deleteUser(id: number): Promise<void>;
}
