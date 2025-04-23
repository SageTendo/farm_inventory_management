import {
  AuthResponseDTO,
  NewUserDTO,
  UserResponseDTO,
} from "../../database/schema/types";

export interface IAuthService {
  /**
   * Handle user registration request for a new user.
   * @param registeringUserId The id of the user registering the new user
   * @param newUser The user to be registered
   * @returns {Promise<AuthResponseDTO>} A promise that resolves to the user registration response
   */
  register(
    registeringUserId: number,
    newUser: NewUserDTO,
  ): Promise<AuthResponseDTO>;

  /**
   * Handle user login request
   * @param username The username of the user
   * @param password The password of the user
   * @returns {Promise<AuthResponseDTO>} A promise that resolves to the user login response
   */
  login(username: string, password: string): Promise<AuthResponseDTO>;

  /**
   * Check if the user has the required role to access the resource
   * @param userID The id of the user
   * @param requiredRoles The roles required to access the resource
   * @returns {Promise<boolean>} A promise that resolves to true if the user has the required role, false otherwise
   */
  hasRequiredRole(userID: number, requiredRoles: string[]): Promise<boolean>;

  /**
   * Update the role of a user
   * @param adminId The id of the user updating the role
   * @param userId The id of the user to be updated
   * @param roleID The id of the role to be assigned to the user
   */
  updateRole(
    adminId: number,
    userId: number,
    roleID: number,
  ): Promise<UserResponseDTO | null>;

  /**
   * Update the password of a user
   * @param adminId The id of the user updating the password
   * @param userId The id of the user to be updated
   * @param password The new password of the user
   */
  updatePassword(
    adminId: number,
    userId: number,
    password: string,
  ): Promise<UserResponseDTO | null>;
}
