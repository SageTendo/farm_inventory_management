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
import { roleTable } from "../../src/main/database";
import { AuthService } from "../../src/main/service/AuthService";
import bcrypt from "bcrypt";
import { IUserRepository } from "../../src/main/database/interfaces/IUserRepository";
import { IRoleRepository } from "../../src/main/database/interfaces/IRoleRepository";
import { AuthDataDTO } from "../../src/shared/dto/auth";

let db: BetterSQLite3Database<Record<string, never>>;

beforeAll(async () => {
  db = setupDb();
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterAll(async () => {
  db.delete(roleTable).run();
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
    const registeringUserId = "admin UUID";
    vi.spyOn(authService, "hasRequiredRole").mockResolvedValue(true);
    mockUserRepository.getByUsername.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue({
      id: "user UUID",
      fullname: "Naruto Uzumaki",
      username: "naruto",
      passwordHash: "hashedPassword",
      roleID: "user role UUID",
      isActive: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const newUser = {
      fullname: "Naruto Uzumaki",
      username: "naruto",
      password: "ramen123",
      roleID: "user role UUID",
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
          id: "user UUID",
          fullname: "Sasuke",
          username: "sasuke",
          passwordHash: "hashedPassword",
          roleID: "user role UUID",
          isActive: false,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        };
      }
      return null;
    });

    const result = await authService.register("admin UUID", {
      fullname: "Sasuke",
      username: "sasuke",
      password: "revenge",
      roleID: "user role UUID",
    });

    expect(result.success).toBe(false);
    expect(result.message).toMatch(/already exists/i);
  });

  test("logs in user with correct credentials", async () => {
    const hashed = await bcrypt.hash("myPass", 10);

    mockUserRepository.getByUsername.mockImplementation(async (username) => {
      if (username === "test") {
        return {
          id: "user UUID",
          username: "test",
          fullname: "",
          passwordHash: hashed,
          roleID: "user role UUID",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      return null;
    });

    mockRoleRepository.getById.mockImplementation(async (id) => {
      if (id === "user role UUID")
        return { id: "user role UUID", type: "STAFF" };
      return null;
    });

    const result = await authService.login("test", "myPass");

    expect(result.success).toBe(true);
    expect(result.authData?.username).toBe("test");
  });

  test("logs in user with incorrect credentials", async () => {
    const hashed = await bcrypt.hash("myPass", 10);
    mockUserRepository.getByUsername.mockResolvedValue({
      id: "user UUID",
      username: "test",
      fullname: "",
      passwordHash: hashed,
      roleID: "user role UUID",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRoleRepository.getById.mockResolvedValue({
      id: "user role UUID",
      type: "ADMIN",
    });

    const result = await authService.login("test", "wrongPass");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid username or password");
  });

  test("hasRequiredRole returns true for empty requiredRoles", async () => {
    const result = await authService.hasRequiredRole("some user UUID", []);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns true for matching role", async () => {
    mockUserRepository.getById.mockResolvedValue({
      id: "user UUID",
      username: "test",
      fullname: "",
      passwordHash: "",
      roleID: "user role UUID",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRoleRepository.getById.mockImplementation(async (id) => {
      if (id === "user role UUID") {
        return {
          id: "user role UUID",
          type: "STAFF",
        };
      }
      return null;
    });

    const result = await authService.hasRequiredRole("user UUID", ["STAFF"]);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns true for multiple matching roles", async () => {
    mockUserRepository.getById.mockResolvedValue({
      id: "admin UUID",
      username: "test",
      fullname: "",
      passwordHash: "",
      roleID: "admin role UUID",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockRoleRepository.getById.mockResolvedValue({
      id: "admin role UUID",
      type: "ADMIN",
    });
    const result = await authService.hasRequiredRole("admin UUID", [
      "ADMIN",
      "OWNER",
    ]);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns false for non-matching role", async () => {
    mockUserRepository.getById.mockResolvedValue({
      id: "user UUID",
      username: "test",
      fullname: "",
      passwordHash: "",
      roleID: "user role UUID",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockRoleRepository.getById.mockResolvedValue({
      id: "user role UUID",
      type: "STAFF",
    });
    const result = await authService.hasRequiredRole("user UUID", [
      "ADMIN",
      "OWNER",
    ]);
    expect(result).toBe(false);
  });

  test("hasRequiredRole returns false for null user", async () => {
    mockUserRepository.getById.mockResolvedValue(null);
    const result = await authService.hasRequiredRole("user UUID", ["ADMIN"]);
    expect(result).toBe(false);
  });

  test("Signs session token", async () => {
    const authData: AuthDataDTO = {
      id: "user UUID",
      username: "test",
      role: "ADMIN",
    };

    const result = await authService.signSession(authData);
    expect(result).toBe("f9688edfa3774233b2abae7bffea2e428b5964b87c7509dba90ba15020078194");
  });

  test("Validates session token", async () => {
    vi.spyOn(authService, "signSession").mockResolvedValue("sessionToken");

    const authData: AuthDataDTO = {
      id: "user UUID",
      username: "test",
      role: "ADMIN",
    };

    const result = await authService.validateSession(
      "sessionToken",
      authData
    );
    expect(result).toBe(true);
  });
});
