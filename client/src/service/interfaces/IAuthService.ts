import { UserLoginResponseDTO } from "../../database/schema/types";

export interface IAuthService {
  login(username: string, password: string): Promise<UserLoginResponseDTO>;
  hasRequiredRole(userID: number, requiredRoles: string[]): Promise<boolean>;
  logout(id: number): Promise<void>;
}
