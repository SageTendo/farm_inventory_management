import { IGenericRepository } from ".";
import { db } from "../db";
import { roleTable } from "../schema";
import { NewRole, Role, UpdateRole } from "../schema/types";
import { eq } from "drizzle-orm";

export class RoleRepository
  implements IGenericRepository<Role, NewRole, UpdateRole>
{
  async create(entity: NewRole): Promise<Role> {
    return db.insert(roleTable).values(entity);
  }

  async getAll(limit: number = 10, offset: number = 0): Promise<Role[]> {
    return db.select().from(roleTable).limit(limit).offset(offset).all();
  }

  async getById(id: number): Promise<Role | null> {
    let role = db.select().from(roleTable).where(eq(roleTable.id, id)).get();
    return role || null;
  }

  async update(id: number, entity: UpdateRole): Promise<Role | null> {
    let [role] = await db
      .update(roleTable)
      .set(entity)
      .where(eq(roleTable.id, id))
      .returning();

    return role || null;
  }

  async delete(id: number): Promise<void> {
    return db.delete(roleTable).where(eq(roleTable.id, id)).run();
  }
}
