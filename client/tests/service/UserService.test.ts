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
import { roleTable } from "../../src/main/database";
import { UserService } from "../../src/main/service/UserService";
import { IUserRepository } from "../../src/main/database/interfaces/IUserRepository";
import { IRoleRepository } from "../../src/main/database/interfaces/IRoleRepository";

let db: BetterSQLite3Database<Record<string, never>>;

beforeAll(() => {
  db = setupDb();
});

afterAll(async () => {
  db.delete(roleTable).run();
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
      id: "user UUID",
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    const user = await mockUserRepository.getById("user UUID");

    expect(user).toEqual({
      id: "user UUID",
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test("Get user by username", async () => {
    mockUserRepository.getByUsername.mockResolvedValue({
      id: "user UUID",
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    const user = await mockUserRepository.getByUsername("johndoe");

    expect(user).toEqual({
      id: "user UUID",
      fullname: "John Doe",
      username: "johndoe",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test("Get all users", async () => {
    mockUserRepository.getAll.mockResolvedValue([
      {
        id: "user UUID",
        fullname: "John Doe",
        username: "johndoe",
        passwordHash: "hashedPassword",
        roleID: "user role UUID",
        isActive: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);

    const users = await mockUserRepository.getAll();

    expect(users).toEqual([
      {
        id: "user UUID",
        fullname: "John Doe",
        username: "johndoe",
        passwordHash: "hashedPassword",
        roleID: "user role UUID",
        isActive: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
  });

  test("Update user", async () => {
    mockUserRepository.update.mockResolvedValue({
      id: "user UUID",
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    const user = await userService.update("user UUID", {
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      updatedAt: expect.any(Date),
    });

    expect(user).toEqual({
      id: "user UUID",
      fullname: "John Doe",
      username: "johndoe1",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test("Delete user", async () => {
    mockUserRepository.delete.mockResolvedValue(undefined);

    await userService.delete("user UUID");
    expect(mockUserRepository.delete).toHaveBeenCalledWith("user UUID");
  });
});
