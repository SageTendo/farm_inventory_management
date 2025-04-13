import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { BaseRepository, IGenericRepository } from ".";
import { roleTable } from "../schema";
import { NewRoleDTO, RoleDTO, UpdateRoleDTO } from "../schema/types";
import { eq } from "drizzle-orm";

export class RoleRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IGenericRepository<RoleDTO, NewRoleDTO, UpdateRoleDTO>
{
  async create(entity: NewRoleDTO): Promise<RoleDTO> {
    const [role] = await this.dbContext
      .insert(roleTable)
      .values(entity)
      .returning();
    return role;
  }

  async getAll(limit: number = 10, offset: number = 0): Promise<RoleDTO[]> {
    return this.dbContext
      .select()
      .from(roleTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  async getById(id: number): Promise<RoleDTO | null> {
    let role = this.dbContext
      .select()
      .from(roleTable)
      .where(eq(roleTable.id, id))
      .get();
    return role || null;
  }

  async update(id: number, entity: UpdateRoleDTO): Promise<RoleDTO | null> {
    let [role] = await this.dbContext
      .update(roleTable)
      .set(entity)
      .where(eq(roleTable.id, id))
      .returning();

    return role || null;
  }

  async delete(id: number): Promise<void> {
    return this.dbContext.delete(roleTable).where(eq(roleTable.id, id)).run();
  }
}
