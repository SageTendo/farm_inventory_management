import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { BaseRepository } from ".";
import { userTable } from "../schema";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../schema/types";
import { eq } from "drizzle-orm";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IUserRepository
{
  async createUser(entity: CreateUserDTO): Promise<UserDTO> {
    const [user] = await this.dbContext
      .insert(userTable)
      .values(entity)
      .returning();
    return user;
  }

  async getAllUsers(
    limit: number = 10,
    offset: number = 0,
  ): Promise<UserDTO[]> {
    return this.dbContext
      .select()
      .from(userTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  async getUserById(id: number): Promise<UserDTO | null> {
    const user = this.dbContext
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .get();
    return user || null;
  }

  async getUserByUsername(username: string): Promise<UserDTO | null> {
    const user = this.dbContext
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .get();
    return user || null;
  }

  async updateUser(id: number, entity: UpdateUserDTO): Promise<UserDTO | null> {
    const [user] = await this.dbContext
      .update(userTable)
      .set(entity)
      .where(eq(userTable.id, id))
      .returning();
    return user || null;
  }

  async deleteUser(id: number): Promise<void> {
    return this.dbContext.delete(userTable).where(eq(userTable.id, id)).run();
  }
}
