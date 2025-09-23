import { IRoleRepository } from "../database/interfaces/IRoleRepository";
import { IUserRepository } from "../database/interfaces/IUserRepository";

import bcrypt from "bcrypt";
import { IAuthService } from "./interfaces/IAuthService";
import { env } from "../../config";
import { UserRoleType } from "../../shared/types";
import { RoleType } from "aws-sdk/clients/cognitoidentity";
import { AuthResponseDTO } from "../../shared/dto/auth";
import { NewUserDTO, UserResponseDTO } from "../../shared/dto/user";

const PERMITTED_ROLES: UserRoleType[] = ["ADMIN"];

export class AuthService implements IAuthService {
  protected userRepository: IUserRepository;
  protected roleRepository: IRoleRepository;

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  async register(
    registeringUserId: string,
    newUser: NewUserDTO
  ): Promise<AuthResponseDTO> {
    if (!(await this.hasRequiredRole(registeringUserId, PERMITTED_ROLES))) {
      return {
        success: false,
        message: "You do not have permission to register users",
      };
    }

    const existingUser = await this.userRepository.getByUsername(
      newUser.username
    );
    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const user = await this.userRepository.create({
      fullname: newUser.fullname,
      username: newUser.username,
      passwordHash: await bcrypt.hash(newUser.password, env.SALT_ROUNDS),
      roleID: newUser.roleID,    });
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
    const user = await this.userRepository.getByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const role = await this.roleRepository.getById(user.roleID);
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
    userId: string,
    requiredRoles: RoleType[]
  ): Promise<boolean> {
    if (requiredRoles.length === 0) return true;

    const user = await this.userRepository.getById(userId);
    if (!user) return false;

    const userRole = await this.roleRepository.getById(user.roleID);
    return userRole ? requiredRoles.includes(userRole.type) : false;
  }

  async updateRole(
    adminId: string,
    userId: string,
    roleID: string
  ): Promise<UserResponseDTO | null> {
    const hasRequiredRole = await this.hasRequiredRole(
      adminId,
      PERMITTED_ROLES
    );
    console.log(hasRequiredRole);
    if (!hasRequiredRole) {
      throw new Error("You do not have permission to update user roles");
    }

    const existingUser = await this.userRepository.getById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const role = await this.roleRepository.getById(roleID);
    if (!role) {
      throw new Error("Invalid role ID");
    }
    return await this.userRepository.update(userId, { roleID });
  }

  async updatePassword(
    adminId: string,
    userId: string,
    password: string
  ): Promise<UserResponseDTO | null> {
    if (!(await this.hasRequiredRole(adminId, PERMITTED_ROLES))) {
      throw new Error("You do not have permission to update user passwords");
    }

    const existingUser = await this.userRepository.getById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (!password.trim()) {
      throw new Error("Password cannot be empty");
    }

    const passwordHash = await bcrypt.hash(password, env.SALT_ROUNDS);
    return await this.userRepository.update(userId, { passwordHash });
  }
}
