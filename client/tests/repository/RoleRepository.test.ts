import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { RoleRepository } from "../../src/database/repository/RoleRepository";
import { afterAll, beforeAll, expect, test } from "vitest";
import { setupDb } from "../testSetup";
import { roleTable } from "../../src/database/schema";
import { roleTypes } from "../../src/database/schema/constants";

let client = new Database(":memory:");
let db: BetterSQLite3Database<Record<string, never>>;
let roleRepository: RoleRepository;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;

  roleRepository = new RoleRepository(db);
});

afterAll(() => {
  db.delete(roleTable).run();
  client.close();
});

test("Create all roles", async () => {
  for (const role of roleTypes) {
    await roleRepository.createRole({
      type: role,
    });
  }

  const roles = await roleRepository.getAllRoles();
  expect(roles.length).toBe(roleTypes.length);
});

test("Get all roles", async () => {
  const roles = await roleRepository.getAllRoles();
  expect(roles.length).toBe(roleTypes.length);
});

test("Get a role by id", async () => {
  const roleType = roleTypes[0];
  const role = await roleRepository.getRoleById(roleType.indexOf(roleType) + 1);
  expect(role).not.toBeNull();
  expect(role?.type).toBe(roleType);
});

test("Get a role by type", async () => {
  const roleType = roleTypes[0];
  const role = await roleRepository.getRoleByType(roleType);
  expect(role).not.toBeNull();
  expect(role?.type).toBe(roleType);
});

test("Delete a role by id", async () => {
  const roleType = roleTypes[0];
  const role = await roleRepository.getRoleById(roleType.indexOf(roleType) + 1);
  expect(role).not.toBeNull();

  await roleRepository.deleteRole(role?.id || 0);
  const deletedRole = await roleRepository.getRoleById(role?.id || 0);
  expect(deletedRole).toBeNull();
});
