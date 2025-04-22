// users.test.ts
import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { roleTable, userTable } from "../../src/database/schema";
import { beforeAll, afterAll, beforeEach, test, expect } from "vitest";
import { UserRepository } from "../../src/database/repository/UserRepository";
import { RoleRepository } from "../../src/database/repository/RoleRepository";
import { roleTypes } from "../../src/database/schema/constants";
import { setupDb } from "../testSetup";

let client = new Database(":memory:");
let db: BetterSQLite3Database<Record<string, never>>;
let roleRepository: RoleRepository;
let userRepository: UserRepository;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;

  roleRepository = new RoleRepository(db);
  userRepository = new UserRepository(db);
});

afterAll(() => {
  db.delete(roleTable).run();
  client.close();
});

beforeEach(() => {
  db.delete(userTable).run(); // reset table before every test
});

test("Create roles", async () => {
  for (const role of roleTypes) {
    const newRole = await roleRepository.createRole({
      type: role,
    });
    expect(newRole.type).toBe(role);
  }
});

test("Get roles", async () => {
  const roles = await roleRepository.getAllRoles();
  for (const role of roles) {
    expect(role.type).toBe(roleTypes[role.id - 1]);
  }
});

test("Create a new user", async () => {
  const user = await userRepository.createUser({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  });

  expect(user).toEqual({
    id: expect.any(Number),
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
    isActive: false,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });
});

test("Get a user by id", async () => {
  const user = await userRepository.createUser({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  });

  const userFromDb = await userRepository.getUserById(user.id);
  expect(userFromDb).toEqual(user);
});

test("Get a user by username", async () => {
  const user = await userRepository.createUser({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  });

  const userFromDb = await userRepository.getUserByUsername("johndoe");
  expect(userFromDb).toEqual(user);
});

test("Update a user", async () => {
  const user = await userRepository.createUser({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  }); // Create a user

  const updatedUser = await userRepository.updateUser(user.id, {
    fullname: "Jane Doe",
    username: "janedoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 2,
  });
  expect(updatedUser).toEqual({
    id: user.id,
    fullname: "Jane Doe",
    username: "janedoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 2,
    isActive: false,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });
});

test("Delete a user", async () => {
  const user = await userRepository.createUser({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  });

  await userRepository.deleteUser(user.id);
  const userFromDb = await userRepository.getUserById(user.id);
  expect(userFromDb).toBeNull();
});

test("Delete all roles", async () => {
  const roles = await roleRepository.getAllRoles();
  for (const role of roles) {
    await roleRepository.deleteRole(role.id);
  }

  const rolesFromDb = await roleRepository.getAllRoles();
  expect(rolesFromDb.length).toBe(0);
});
