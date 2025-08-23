import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import {
  beforeAll,
  afterAll,
  afterEach,
  vi,
  describe,
  expect,
  test,
} from "vitest";
import { roleTable } from "../../src/database/schema";
import { setupDb } from "../testSetup";
import { ExchangeRateService } from "../../src/service/ExchangeRateService";
import { IAuthService } from "../../src/service/interfaces/IAuthService";
import { IExchangeRateService } from "../../src/service/interfaces/IExchangeRateService";

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

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ExchangeRateService", () => {
  const mockExchangeRepository = vi.mocked<IExchangeRateService>({
    set: vi.fn(),
    getAll: vi.fn(),
    getById: vi.fn(),
  });

  const mockAuthService = vi.mocked<IAuthService>({
    login: vi.fn(),
    register: vi.fn(),
    updatePassword: vi.fn(),
    updateRole: vi.fn(),
    hasRequiredRole: vi.fn(),
  });

  const exchangeRateService = new ExchangeRateService(
    mockAuthService,
    mockExchangeRepository
  );

  test("Set new rate", async () => {
    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockExchangeRepository.set.mockResolvedValue({
      id: 1,
      rate: 1.2,
      updatedAt: new Date(),
      updatedBy: 1,
    });

    const rate = await exchangeRateService.set({
      rate: 1.2,
      updatedBy: 1,
    });

    expect(rate).toBeDefined();
    expect(rate).toEqual({
      id: 1,
      rate: 1.2,
      updatedAt: expect.any(Date),
      updatedBy: 1,
    });
  });

  test("Get by ID", async () => {
    mockExchangeRepository.getById.mockResolvedValue({
      id: 1,
      rate: 1.2,
      updatedBy: 1,
      updatedAt: new Date(),
    });

    const rate = await exchangeRateService.getById(1);
    expect(rate).toBeDefined();
  });

  test("Get All products", async () => {
    mockExchangeRepository.getAll.mockResolvedValue([]);
    const rates = await exchangeRateService.getAll();
    expect(rates).toBeDefined();
  });
});
