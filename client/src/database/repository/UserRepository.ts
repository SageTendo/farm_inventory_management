import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { BaseRepository } from ".";
import { userTable } from "../schema";
import {
  AuthUserDTO,
  NewUserDTO,
  UpdateUserDTO,
  UserDTO,
} from "../schema/types";
import { eq } from "drizzle-orm";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IUserRepository
{
  async createUser(entity: NewUserDTO): Promise<UserDTO> {
    return this.dbContext.insert(userTable).values(entity);
  }

  async getAllUsers(
    limit: number = 10,
    offset: number = 0
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

  async getUserByUsernameAndPasswordHash(
    username: string,
    passwordHash: string
  ): Promise<AuthUserDTO | null> {
    const user = this.dbContext
      .select()
      .from(userTable)
      .where(
        eq(userTable.username, username) &&
          eq(userTable.passwordHash, passwordHash)
      )
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
