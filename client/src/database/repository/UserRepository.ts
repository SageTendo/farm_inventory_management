import { IGenericRepository } from ".";
import { NewUser, UpdateUser, User } from "../schema/types";

export class UserRepository
  implements IGenericRepository<User, NewUser, UpdateUser>
{
  create(entity: NewUser): Promise<User> {
    // TODO: Create user
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<User[]> {
    // TODO: Get all users
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<User | null> {
    // TODO: Get user by id
    throw new Error("Method not implemented.");
  }
  update(id: number, entity: UpdateUser): Promise<User | null> {
    // TODO: Update user
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    // TODO: Delete user
    throw new Error("Method not implemented.");
  }
}
