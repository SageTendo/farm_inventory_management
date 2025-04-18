import { AuthResponseDTO, NewUserDTO } from "../../database/schema/types";

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
}
