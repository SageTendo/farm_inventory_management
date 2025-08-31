import { BaseRepository } from ".";
import { roleTable } from "../schema";
import { NewRoleDTO, RoleDTO } from "../schema/types";
import { eq } from "drizzle-orm";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { RoleType } from "../schema/constants";

export class RoleRepository extends BaseRepository implements IRoleRepository {
  async create(entity: NewRoleDTO): Promise<RoleDTO> {
    return this.dbContext.insert(roleTable).values(entity).returning().get();
  }

  async getAll(limit: number = 10, offset: number = 0): Promise<RoleDTO[]> {
    return this.dbContext
      .select()
      .from(roleTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  async getById(roleId: string): Promise<RoleDTO | null> {
    const role = await this.dbContext
      .select()
      .from(roleTable)
      .where(eq(roleTable.id, roleId))
      .get();
    return role || null;
  }

  async getByType(role_type: RoleType): Promise<RoleDTO | null> {
    const role = await this.dbContext
      .select()
      .from(roleTable)
      .where(eq(roleTable.type, role_type))
      .get();
    return role || null;
  }

  async delete(roleId: string): Promise<void> {
    this.dbContext.delete(roleTable).where(eq(roleTable.id, roleId)).run();
  }
}
