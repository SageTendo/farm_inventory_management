import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { IGenericRepository, BaseRepository } from ".";
import { userTable } from "../schema";
import { NewUserDTO, UpdateUserDTO, UserDTO } from "../schema/types";
import { eq } from "drizzle-orm";

export class UserRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IGenericRepository<UserDTO, NewUserDTO, UpdateUserDTO>
{
  async create(entity: NewUserDTO): Promise<UserDTO> {
    return this.dbContext.insert(userTable).values(entity);
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

  async update(id: number, entity: UpdateUserDTO): Promise<UserDTO | null> {
    const [user] = await this.dbContext
      .update(userTable)
      .set(entity)
      .where(eq(userTable.id, id))
      .returning();

    return user || null;
  }

  async delete(id: number): Promise<void> {
    return this.dbContext.delete(userTable).where(eq(userTable.id, id)).run();
  }
}
