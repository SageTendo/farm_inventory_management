import { RoleRepository } from "../../src/main/database/repository/RoleRepository";
import { afterAll, beforeAll, expect, test } from "vitest";
import { setupDb } from "../testSetup";
import { roleTable } from "../../src/main/database";
import { IRoleRepository } from "../../src/main/database/interfaces/IRoleRepository";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { RoleDTO } from "../../src/shared/dto/role";
import { userRoleTypes } from "../../src/shared/types";

let db: BetterSQLite3Database;
let roleRepository: IRoleRepository;
let savedRoles: RoleDTO[] = [];

beforeAll(async () => {
  db = setupDb();
  roleRepository = new RoleRepository(db);
});

afterAll(() => {
  db.delete(roleTable).run();
});

test("Create all roles", async () => {
  for (const role of userRoleTypes) {
    await roleRepository.create({
      type: role,
    });
  }

  const roles = await roleRepository.getAll();
  expect(roles.length).toBe(userRoleTypes.length);
});

test("Get all roles", async () => {
  const roles = await roleRepository.getAll();
  expect(roles.length).toBe(userRoleTypes.length);
  savedRoles = roles;
});

test("Get a role by id", async () => {
  const roleType = userRoleTypes[0];
  const role = await roleRepository.getById(savedRoles[0].id);
  expect(role).not.toBeNull();
  expect(role?.type).toBe(roleType);
});

test("Get a role by type", async () => {
  const roleType = userRoleTypes[0];
  const role = await roleRepository.getByType(roleType);
  expect(role).not.toBeNull();
  expect(role?.type).toBe(roleType);
});

test("Delete a role by id", async () => {
  const role = await roleRepository.getById(savedRoles[0].id);
  expect(role).not.toBeNull();

  await roleRepository.delete(role?.id);
  const deletedRole = await roleRepository.getById(role?.id);
  expect(deletedRole).toBeNull();
});
