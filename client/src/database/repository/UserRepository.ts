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
  async create(entity: CreateUserDTO): Promise<UserDTO> {
    const [user] = await this.dbContext
      .insert(userTable)
      .values(entity)
      .returning();
    return user;
  }

  async getAll(limit: number = 10, offset: number = 0): Promise<UserDTO[]> {
    return this.dbContext
      .select()
      .from(userTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  async getById(id: number): Promise<UserDTO | null> {
    const user = this.dbContext
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .get();
    return user || null;
  }

  async getByUsername(username: string): Promise<UserDTO | null> {
    const user = this.dbContext
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .get();
    return user || null;
  }

  async update(id: number, entity: UpdateUserDTO): Promise<UserDTO | null> {
    const [user] = await this.dbContext
      .update(userTable)
      .set(entity)
      .where(eq(userTable.id, id))
      .returning();
    return user || null;
  }

  async delete(id: number): Promise<void> {
    this.dbContext.delete(userTable).where(eq(userTable.id, id)).run();
  }
}
