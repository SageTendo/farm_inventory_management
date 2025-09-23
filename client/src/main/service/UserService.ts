import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../database/interfaces/IUserRepository";
import { IRoleRepository } from "../database/interfaces/IRoleRepository";
import bcrypt from "bcrypt";
import { env } from "../../config";
import { UserResponseDTO, UpdateUserDTO } from "../../shared/dto/user";

export class UserService implements IUserService {
  protected userRepository: IUserRepository;
  protected roleRepository: IRoleRepository;

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  populateDefaultAdmin = async (
    adminFullname: string,
    adminUsername: string,
    adminPassword: string
  ): Promise<void> => {
    const existingAdmin =
      await this.userRepository.getByUsername(adminUsername);
    if (existingAdmin) {
      return;
    }

    const adminRole = await this.roleRepository.getByType("ADMIN");
    if (!adminRole) {
      throw new Error("Admin role not found. Please populate roles first.");
    }

    const passwordHash = await bcrypt.hash(adminPassword, env.SALT_ROUNDS);
    if (!passwordHash) {
      throw new Error("Failed to hash admin password");
    }

    await this.userRepository.create({
      username: adminUsername,
      passwordHash: passwordHash,
      fullname: adminFullname,
      roleID: adminRole.id,
    });
  };

  async getAll(limit?: number, offset?: number): Promise<UserResponseDTO[]> {
    return await this.userRepository.getAll(limit, offset);
  }

  async getById(userId: string): Promise<UserResponseDTO | null> {
    return await this.userRepository.getById(userId);
  }

  async getByUsername(username: string): Promise<UserResponseDTO | null> {
    return this.userRepository.getByUsername(username);
  }

  async update(
    userId: string,
    entity: UpdateUserDTO
  ): Promise<UserResponseDTO | null> {
    if (entity.roleID) {
      entity.roleID = undefined;
    }

    if (entity.passwordHash) {
      entity.passwordHash = undefined;
    }

    entity.updatedAt = new Date();
    return await this.userRepository.update(userId, entity);
  }

  async delete(userId: string): Promise<void> {
    return await this.userRepository.delete(userId);
  }
}
