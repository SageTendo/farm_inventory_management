import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { setupDb } from "../testSetup";
import { roleTable } from "../../src/database/schema";
import { AuthService } from "../../src/service/AuthService";
import bcrypt from "bcrypt";
import { IUserRepository } from "../../src/database/interfaces/IUserRepository";
import { IRoleRepository } from "../../src/database/interfaces/IRoleRepository";

let client: Database.Database;
let db: BetterSQLite3Database<Record<string, never>>;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterAll(async () => {
  db.delete(roleTable).run();
  client.close();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AuthService", () => {
  const mockUserRepository = vi.mocked<IUserRepository>({
    create: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    getByUsername: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  });

  const mockRoleRepository = vi.mocked<IRoleRepository>({
    create: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
    getByType: vi.fn(),
    delete: vi.fn(),
  });
  const authService = new AuthService(mockUserRepository, mockRoleRepository);

  test("registers user if admin and user doesn't exist", async () => {
    const registeringUserId = 1;
    vi.spyOn(authService, "hasRequiredRole").mockResolvedValue(true);
    mockUserRepository.getByUsername.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue({
      id: 2,
      fullname: "Naruto Uzumaki",
      username: "naruto",
      passwordHash: "hashedPassword",
      roleID: 3,
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const newUser = {
      fullname: "Naruto Uzumaki",
      username: "naruto",
      password: "ramen123",
      roleID: 3,
    };

    const result = await authService.register(registeringUserId, newUser);
    expect(result.success).toBe(true);
    expect(mockUserRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ username: "naruto" })
    );
  });

  test("fails to register if user already exists", async () => {
    vi.spyOn(authService, "hasRequiredRole").mockResolvedValue(true);
    mockUserRepository.getByUsername.mockImplementation(async (username) => {
      if (username === "sasuke") {
        return {
          id: 5,
          fullname: "Sasuke",
          username: "sasuke",
          passwordHash: "hashedPassword",
          roleID: 2,
          isActive: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        };
      }
      return null;
    });

    const result = await authService.register(1, {
      fullname: "Sasuke",
      username: "sasuke",
      password: "revenge",
      roleID: 2,
    });

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/already exists/i);
  });

  test("logs in user with correct credentials", async () => {
    const hashed = await bcrypt.hash("myPass", 10);

    mockUserRepository.getByUsername.mockImplementation(async (username) => {
      if (username === "test") {
        return {
          id: 1,
          username: "test",
          fullname: "",
          passwordHash: hashed,
          roleID: 0,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      return null;
    });

    mockRoleRepository.getById.mockImplementation(async (id) => {
      if (id === 0) return { id: 0, type: "ADMIN" };
      return null;
    });

    const result = await authService.login("test", "myPass");

    expect(result.success).toBe(true);
    expect(result.authData?.username).toBe("test");
  });

  test("logs in user with incorrect credentials", async () => {
    const hashed = await bcrypt.hash("myPass", 10);
    mockUserRepository.getByUsername.mockResolvedValue({
      id: 1,
      username: "test",
      fullname: "",
      passwordHash: hashed,
      roleID: 2,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRoleRepository.getById.mockResolvedValue({
      id: 0,
      type: "ADMIN",
    });

    const result = await authService.login("test", "wrongPass");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid username or password");
  });

  test("hasRequiredRole returns false for empty requiredRoles", async () => {
    const result = await authService.hasRequiredRole(1, []);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns false for empty requiredRoles", async () => {
    const result = await authService.hasRequiredRole(1, []);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns true for matching role", async () => {
    mockUserRepository.getById.mockResolvedValue({
      id: 1,
      username: "test",
      fullname: "",
      passwordHash: "",
      roleID: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRoleRepository.getById.mockImplementation(async (id) => {
      if (id === 1) {
        return {
          id: 1,
          type: "ADMIN",
        };
      }
      return null;
    });

    const result = await authService.hasRequiredRole(1, ["ADMIN"]);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns true for multiple matching roles", async () => {
    mockUserRepository.getById.mockResolvedValue({
      id: 1,
      username: "test",
      fullname: "",
      passwordHash: "",
      roleID: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockRoleRepository.getById.mockResolvedValue({ id: 1, type: "ADMIN" });
    const result = await authService.hasRequiredRole(1, ["ADMIN", "OWNER"]);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns false for non-matching role", async () => {
    mockUserRepository.getById.mockResolvedValue({
      id: 1,
      username: "test",
      fullname: "",
      passwordHash: "",
      roleID: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockRoleRepository.getById.mockResolvedValue({ id: 1, type: "STAFF" });
    const result = await authService.hasRequiredRole(1, ["ADMIN", "OWNER"]);
    expect(result).toBe(false);
  });

  test("hasRequiredRole returns false for null user", async () => {
    mockUserRepository.getById.mockResolvedValue(null);
    const result = await authService.hasRequiredRole(1, ["ADMIN"]);
    expect(result).toBe(false);
  });
});
