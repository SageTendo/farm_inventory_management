import { IRoleRepository } from "../database/interfaces/IRoleRepository";
import { IUserRepository } from "../database/interfaces/IUserRepository";
import { AuthResponseDTO, NewUserDTO } from "../database/schema/types";

import bcrypt from "bcrypt";
import { IAuthService } from "./interfaces/IAuthService";
import { RoleType } from "../database/schema/constants.ts";

export class AuthService implements IAuthService {
  protected userRepository: IUserRepository;
  protected roleRepository: IRoleRepository;
  private readonly SALT = 10;

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository,
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  async register(
    registeringUserId: number,
    newUser: NewUserDTO,
  ): Promise<AuthResponseDTO> {
    if (!(await this.hasRequiredRole(registeringUserId, ["ADMIN"]))) {
      return {
        success: false,
        message: "You do not have permission to register users",
      };
    }

    const existingUser = await this.userRepository.getUserByUsername(
      newUser.username,
    );
    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const user = await this.userRepository.createUser({
      fullname: newUser.fullname,
      username: newUser.username,
      passwordHash: await bcrypt.hash(newUser.password, this.SALT),
      roleID: newUser.roleID,
    });
    if (!user) {
      return {
        success: false,
        message: "Failed to register user",
      };
    }

    return {
      success: true,
      message: "User registered successfully",
    };
  }

  async login(username: string, password: string): Promise<AuthResponseDTO> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const role = await this.roleRepository.getRoleById(user.roleID);
    if (role === null) {
      return {
        success: false,
        message: "Role not found for user",
      };
    }

    return {
      success: true,
      message: "Login successful",
      authData: {
        id: user.id,
        username: user.username,
        role: role.type,
      },
    };
  }

  async hasRequiredRole(
    userID: number,
    requiredRoles: RoleType[],
  ): Promise<boolean> {
    if (requiredRoles.length === 0) return true;

    const user = await this.userRepository.getUserById(userID);
    if (!user) return false;

    const userRole = await this.roleRepository.getRoleById(user.roleID);
    return userRole ? requiredRoles.includes(userRole.type) : false;
  }

  async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
