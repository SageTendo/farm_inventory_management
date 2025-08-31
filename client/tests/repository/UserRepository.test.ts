// users.test.ts
import { roleTable, userTable } from "../../src/database/schema";
import { beforeAll, afterAll, beforeEach, test, expect } from "vitest";
import { UserRepository } from "../../src/database/repository/UserRepository";
import { setupDb } from "../testSetup";
import { IUserRepository } from "../../src/database/interfaces/IUserRepository";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

let db: BetterSQLite3Database;
let userRepository: IUserRepository;

beforeAll(async () => {
  db = setupDb();
  db.run("PRAGMA foreign_keys = OFF;");
  userRepository = new UserRepository(db);
});

afterAll(() => {
  db.delete(roleTable).run();
});

beforeEach(() => {
  db.delete(userTable).run(); // reset table before every test
});

test("Create a new user", async () => {
  const user = await userRepository.create({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: "Some Role UUID",
  });

  expect(user).toEqual({
    id: expect.any(String),
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: "Some Role UUID",
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
    roleID: "Some Role UUID",
  });

  const userFromDb = await userRepository.getById(user.id);
  expect(userFromDb).toEqual(user);
});

test("Get a user by username", async () => {
  const user = await userRepository.create({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: "Some Role UUID",
  });

  const userFromDb = await userRepository.getByUsername("johndoe");
  expect(userFromDb).toEqual(user);
});

test("Update a user", async () => {
  const user = await userRepository.create({
    fullname: "John Doe",
    username: "johndoe",
    passwordHash: "hashedPassword",
    roleID: "Some Role UUID",
  }); // Create a user

  const updatedUser = await userRepository.update(user.id, {
    fullname: "Jane Doe",
    username: "janedoe",
    passwordHash: "hashedPassword",
    roleID: "Some Role UUID",
  });
  expect(updatedUser).toEqual({
    id: user.id,
    fullname: "Jane Doe",
    username: "janedoe",
    passwordHash: "hashedPassword",
    roleID: "Some Role UUID",
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
    roleID: "Some Role UUID",
  });

  await userRepository.delete(user.id);
  const userFromDb = await userRepository.getById(user.id);
  expect(userFromDb).toBeNull();
});
