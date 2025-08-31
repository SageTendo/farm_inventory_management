import { IUserService } from "./interfaces/IUserService.ts";
import { UpdateUserDTO, UserResponseDTO } from "../database/schema/types.ts";
import { IUserRepository } from "../database/interfaces/IUserRepository.ts";
import { IRoleRepository } from "../database/interfaces/IRoleRepository.ts";

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
