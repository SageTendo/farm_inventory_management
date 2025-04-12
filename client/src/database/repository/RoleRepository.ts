import { IGenericRepository } from ".";
import { NewRole, Role, UpdateRole } from "../schema/types";

export class RoleRepository
  implements IGenericRepository<Role, NewRole, UpdateRole>
{
  create(entity: NewRole): Promise<Role> {
    // TODO: Create role
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Role[]> {
    // TODO: Get all roles
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Role | null> {
    // TODO: Get role by id
    throw new Error("Method not implemented.");
  }

  update(id: number, entity: UpdateRole): Promise<Role | null> {
    // TODO: Update role
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<void> {
    // TODO: Delete role
    throw new Error("Method not implemented.");
  }
}
