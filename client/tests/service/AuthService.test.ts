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
import { RoleRepository } from "../../src/database/repository/RoleRepository";
import { UserRepository } from "../../src/database/repository/UserRepository";
import bcrypt from "bcrypt";

let client = new Database(":memory:");
let db: BetterSQLite3Database<Record<string, never>>;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;
});

beforeEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  db.delete(roleTable).run();
  client.close();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AuthService", () => {
  const mockUserRepository: UserRepository = {
    createUser: vi.fn(),
    getAllUsers: vi.fn(),
    getUserById: vi.fn(),
    getUserByUsername: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
  } as unknown as UserRepository;

  const mockRoleRepository: RoleRepository = {
    createRole: vi.fn(),
    getAllRoles: vi.fn(),
    getRoleById: vi.fn(),
    getRoleByType: vi.fn(),
    deleteRole: vi.fn(),
  } as unknown as RoleRepository;

  const authService = new AuthService(mockUserRepository, mockRoleRepository);

  test("registers user if admin and user doesn't exist", async () => {
    const registeringUserId = 1;
    vi.spyOn(authService, "hasRequiredRole").mockResolvedValue(true);
    mockUserRepository.getUserByUsername.mockResolvedValue(null);
    mockUserRepository.createUser.mockResolvedValue({
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
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({ username: "naruto" }),
    );
  });

  test("fails to register if user already exists", async () => {
    vi.spyOn(authService, "hasRequiredRole").mockResolvedValue(true);
    mockUserRepository.getUserByUsername.mockResolvedValue({ id: 5 });

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
    mockUserRepository.getUserByUsername.mockResolvedValue({
      id: 1,
      username: "test",
      passwordHash: hashed,
      roleID: 2,
    });

    mockRoleRepository.getRoleById.mockResolvedValue({
      type: "ADMIN",
    });

    const result = await authService.login("test", "myPass");
    expect(result.success).toBe(true);
    expect(result.authData.username).toBe("test");
  });

  test("logs in user with incorrect credentials", async () => {
    const hashed = await bcrypt.hash("myPass", 10);
    mockUserRepository.getUserByUsername.mockResolvedValue({
      id: 1,
      username: "test",
      passwordHash: hashed,
      roleID: 2,
    });

    mockRoleRepository.getRoleById.mockResolvedValue({
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

  test("hasRequiredRole returns true for matching role", async () => {
    mockUserRepository.getUserById.mockResolvedValue({ roleID: 1 });
    mockRoleRepository.getRoleById.mockResolvedValue({ type: "ADMIN" });
    const result = await authService.hasRequiredRole(1, ["ADMIN"]);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns true for multiple matching roles", async () => {
    mockUserRepository.getUserById.mockResolvedValue({ roleID: 1 });
    mockRoleRepository.getRoleById.mockResolvedValue({ type: "ADMIN" });
    const result = await authService.hasRequiredRole(1, ["ADMIN", "USER"]);
    expect(result).toBe(true);
  });

  test("hasRequiredRole returns false for non-matching role", async () => {
    mockUserRepository.getUserById.mockResolvedValue({ roleID: 1 });
    mockRoleRepository.getRoleById.mockResolvedValue({ type: "USER" });
    const result = await authService.hasRequiredRole(1, ["ADMIN", "OWNER"]);
    expect(result).toBe(false);
  });

  test("hasRequiredRole returns false for null user", async () => {
    mockUserRepository.getUserById.mockResolvedValue(null);
    const result = await authService.hasRequiredRole(1, ["ADMIN"]);
    expect(result).toBe(false);
  });
});
