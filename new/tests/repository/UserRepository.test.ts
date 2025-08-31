// users.test.ts
import { roleTable, userTable } from "../../src/database/schema";
import { beforeAll, afterAll, beforeEach, test, expect } from "vitest";
import { UserRepository } from "../../src/database/repository/UserRepository";
import { roleTypes } from "../../src/database/schema/constants";
import { setupDb } from "../testSetup";
import { IUserRepository } from "../../src/database/interfaces/IUserRepository";
import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

let client: Database.Database;
let db: BetterSQLite3Database;
let userRepository: IUserRepository;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;
  db.run("PRAGMA foreign_keys = OFF;");
  userRepository = new UserRepository(db);
});

afterAll(() => {
  db.delete(roleTable).run();
  client.close();
});

beforeEach(() => {
  db.delete(userTable).run(); // reset table before every test
});

test("Create a new user", async () => {
  const user = await userRepository.create({
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
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  });
});

test("Get a user by id", async () => {
  const user = await userRepository.create({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  });

  const userFromDb = await userRepository.getById(user.id);
  expect(userFromDb).toEqual(user);
});

test("Get a user by username", async () => {
  const user = await userRepository.create({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  });

  const userFromDb = await userRepository.getByUsername("johndoe");
  expect(userFromDb).toEqual(user);
});

test("Update a user", async () => {
  const user = await userRepository.create({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  }); // Create a user

  const updatedUser = await userRepository.update(user.id, {
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
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  });
});

test("Delete a user", async () => {
  const user = await userRepository.create({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: roleTypes.indexOf("ADMIN") + 1,
  });

  await userRepository.delete(user.id);
  const userFromDb = await userRepository.getById(user.id);
  expect(userFromDb).toBeNull();
});
