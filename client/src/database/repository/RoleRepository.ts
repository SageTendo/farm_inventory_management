import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { BaseRepository } from ".";
import { roleTable } from "../schema";
import { NewRoleDTO, RoleDTO, UpdateRoleDTO } from "../schema/types";
import { eq } from "drizzle-orm";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { RoleType } from "../schema/constants";

export class RoleRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IRoleRepository
{
  async createRole(entity: NewRoleDTO): Promise<RoleDTO> {
    const [role] = await this.dbContext
      .insert(roleTable)
      .values(entity)
      .returning();
    return role;
  }

  async getAllRoles(
    limit: number = 10,
    offset: number = 0
  ): Promise<RoleDTO[]> {
    return this.dbContext
      .select()
      .from(roleTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  async getRoleById(id: number): Promise<RoleDTO | null> {
    const role = this.dbContext
      .select()
      .from(roleTable)
      .where(eq(roleTable.id, id))
      .get();
    return role || null;
  }

  async getRoleByType(role_type: RoleType): Promise<RoleDTO | null> {
    const role = this.dbContext
      .select()
      .from(roleTable)
      .where(eq(roleTable.type, role_type))
      .get();
    return role || null;
  }

  async updateRole(id: number, entity: UpdateRoleDTO): Promise<RoleDTO | null> {
    const [role] = await this.dbContext
      .update(roleTable)
      .set(entity)
      .where(eq(roleTable.id, id))
      .returning();

    return role || null;
  }

  async deleteRole(id: number): Promise<void> {
    return this.dbContext.delete(roleTable).where(eq(roleTable.id, id)).run();
  }
}
