import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import {
  afterAll,
  beforeAll,
  vi,
  test,
  describe,
  expect,
  beforeEach,
} from "vitest";
import { setupDb } from "../testSetup";
import { roleTable } from "../../src/database/schema";
import { UserService } from "../../src/service/UserService";
import { IUserRepository } from "../../src/database/interfaces/IUserRepository";
import { IRoleRepository } from "../../src/database/interfaces/IRoleRepository";

let client: Database.Database;
let db: BetterSQLite3Database<Record<string, never>>;

beforeAll(() => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;
});

afterAll(async () => {
  db.delete(roleTable).run();
  client.close();
});

describe("UserService", () => {
  const mockUserRepository = vi.mocked<IUserRepository>({
    create: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    getByUsername: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  });

  const mockRoleRepository: IRoleRepository = {
    create: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    getByType: vi.fn(),
    delete: vi.fn(),
  };
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository, mockRoleRepository);
    vi.clearAllMocks();
  });

  test("Get user by id", async () => {
    mockUserRepository.getById.mockResolvedValue({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    const user = await mockUserRepository.getById(1);

    expect(user).toEqual({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test("Get user by username", async () => {
    mockUserRepository.getByUsername.mockResolvedValue({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    const user = await mockUserRepository.getByUsername("johndoe");

    expect(user).toEqual({
      id: 1,
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test("Get all users", async () => {
    mockUserRepository.getAll.mockResolvedValue([
      {
        id: 1,
        fullname: "John Doe",
        username: "johndoe",
        passwordHash: "hashedPassword",
        roleID: 1,
        isActive: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);

    const users = await mockUserRepository.getAll();

    expect(users).toEqual([
      {
        id: 1,
        fullname: "John Doe",
        username: "johndoe",
        passwordHash: "hashedPassword",
        roleID: 1,
        isActive: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
  });

  test("Update user", async () => {
    mockUserRepository.update.mockResolvedValue({
      id: 1,
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    const user = await userService.update(1, {
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      updatedAt: expect.any(Date),
    });

    expect(user).toEqual({
      id: 1,
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: 1,
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test("Delete user", async () => {
    mockUserRepository.delete.mockResolvedValue(undefined);

    await userService.delete(1);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
  });
});
