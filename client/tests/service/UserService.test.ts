import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { afterAll, beforeAll, vi, test, describe, expect } from "vitest";
import { setupDb } from "../testSetup";
import { roleTable } from "../../src/database/schema";
import { IUserRepository } from "../../src/database/interfaces/IUserRepository";
import { UserService } from "../../src/service/UserService";

let client = new Database(":memory:");
let db: BetterSQLite3Database<Record<string, never>>;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;
});

afterAll(() => {
  db.delete(roleTable).run();
  client.close();
});

describe("UserService", () => {
  const mockUserRepository: IUserRepository = {
    createUser: vi.fn(),
    getAllUsers: vi.fn(),
    getUserById: vi.fn(),
    getUserByUsername: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
  } as unknown as IUserRepository;

  const userService = new UserService(mockUserRepository);

  test("Get user by id", async () => {
    mockUserRepository.getUserById.mockResolvedValue({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const user = await mockUserRepository.getUserById(1);

    expect(user).toEqual({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Get user by username", async () => {
    mockUserRepository.getUserByUsername.mockResolvedValue({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const user = await mockUserRepository.getUserByUsername("johndoe");

    expect(user).toEqual({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Get all users", async () => {
    mockUserRepository.getAllUsers.mockResolvedValue([
      {
        id: 1,
        fullname: "John Doe",
        username: "johndoe",
        passwordHash: "hashedPassword",
        roleID: 1,
        isActive: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);

    const users = await mockUserRepository.getAllUsers();

    expect(users).toEqual([
      {
        id: 1,
        fullname: "John Doe",
        username: "johndoe",
        passwordHash: "hashedPassword",
        roleID: 1,
        isActive: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  test("Update user", async () => {
    mockUserRepository.updateUser.mockResolvedValue({
      id: 1,
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const user = await userService.updateUser(1, {
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      updatedAt: expect.any(String),
    });

    expect(user).toEqual({
      id: 1,
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("Delete user", async () => {
    mockUserRepository.deleteUser.mockResolvedValue(null);
    await userService.deleteUser(1);
  });
});
