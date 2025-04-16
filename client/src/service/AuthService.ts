import { IRoleRepository } from "../database/interfaces/IRoleRepository";
import { IUserRepository } from "../database/interfaces/IUserRepository";
import { UserLoginResponseDTO } from "../database/schema/types";

import bcrypt from "bcrypt";
import { IAuthService } from "./interfaces/IAuthService";

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

  async login(
    username: string,
    password: string
  ): Promise<UserLoginResponseDTO> {
    const passwordHash = await bcrypt.hash(password, 10);
    let user = await this.userRepository.getUserByUsernameAndPasswordHash(
      username,
      passwordHash
    );
    if (user === null) {
      throw new Error("User not found");
    }

    await this.userRepository.updateUser(user.id, {
      isActive: true,
    });

    return {
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        roleID: user.roleID,
        isActive: true,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async hasRequiredRole(
    userID: number,
    requiredRoles: string[]
  ): Promise<boolean> {
    if (requiredRoles.length === 0) {
      return true;
    }

    const user = await this.userRepository.getUserById(userID);
    if (user === null) {
      return false;
    }

    const userRole = await this.roleRepository.getRoleById(user.roleID);
    if (userRole === null) {
      return false;
    }

    return requiredRoles.includes(userRole.type);
  }

  async logout(id: number): Promise<void> {
    await this.userRepository.updateUser(id, {
      isActive: false,
    });
  }
}
