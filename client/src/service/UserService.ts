import { IUserService } from "./interfaces/IUserService.ts";
import { UpdateUserDTO, UserResponseDTO } from "../database/schema/types.ts";
import { IUserRepository } from "../database/interfaces/IUserRepository.ts";

export class UserService implements IUserService {
  protected userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(
    limit?: number,
    offset?: number,
  ): Promise<UserResponseDTO[]> {
    return await this.userRepository.getAllUsers(limit, offset);
  }

  async getUserById(id: number): Promise<UserResponseDTO | null> {
    return await this.userRepository.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<UserResponseDTO | null> {
    return this.userRepository.getUserByUsername(username);
  }

  async updateUser(
    id: number,
    entity: UpdateUserDTO,
  ): Promise<UserResponseDTO | null> {
    return await this.userRepository.updateUser(id, entity);
  }

  async deleteUser(id: number): Promise<void> {
    return await this.userRepository.deleteUser(id);
  }
}
