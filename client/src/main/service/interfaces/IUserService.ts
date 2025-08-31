import { UpdateUserDTO, UserResponseDTO } from "../../database/schema/types";

export interface IUserService {
  /**
   * Get all users
   * @param limit The maximum number of users to retrieve
   * @param offset The number of users to skip before retrieving the first user
   */
  getAll(limit?: number, offset?: number): Promise<UserResponseDTO[]>;

  /**
   * Gets a user by their id
   * @param userId The id of the user
   */
  getById(userId: string): Promise<UserResponseDTO | null>;

  /**
   * Gets a user by their username
   * @param username The username of the user
   */
  getByUsername(username: string): Promise<UserResponseDTO | null>;

  /**
   * Handles updating a user with the given id
   * @param userId The id of the user to update
   * @param entity The information to update for the user
   */
  update(
    userId: string,
    entity: UpdateUserDTO
  ): Promise<UserResponseDTO | null>;

  /**
   * Handles the deletion of a user
   * @param userId The id of the user to delete
   */
  delete(userId: string): Promise<void>;
}
