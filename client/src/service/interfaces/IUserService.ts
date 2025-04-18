import { UpdateUserDTO, UserResponseDTO } from "../../database/schema/types.ts";

export interface IUserService {
  /**
   * Get all users
   * @param limit The maximum number of users to retrieve
   * @param offset The number of users to skip before retrieving the first user
   */
  getAllUsers(limit?: number, offset?: number): Promise<UserResponseDTO[]>;

  /**
   * Gets a user by their id
   * @param id The id of the user
   */
  getUserById(id: number): Promise<UserResponseDTO | null>;

  /**
   * Gets a user by their username
   * @param username The username of the user
   */
  getUserByUsername(username: string): Promise<UserResponseDTO | null>;

  /**
   * Handles updating a user with the given id
   * @param id The id of the user to update
   * @param entity The information to update for the user
   */
  updateUser(
    id: number,
    entity: UpdateUserDTO,
  ): Promise<UserResponseDTO | null>;

  /**
   * Handles the deletion of a user
   * @param id The id of the user to delete
   */
  deleteUser(id: number): Promise<void>;
}
