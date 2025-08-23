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
import { IStockRepository } from "../../src/database/interfaces/IStockRepository";
import { StockService } from "../../src/service/StockService";
import { IAuthService } from "../../src/service/interfaces/IAuthService";

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

describe("StockService", () => {
  const mockStockRepository = vi.mocked<IStockRepository>({
    getAll: vi.fn(),
    getById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  });

  const mockAuthService = vi.mocked<IAuthService>({
    login: vi.fn(),
    register: vi.fn(),
    updatePassword: vi.fn(),
    updateRole: vi.fn(),
    hasRequiredRole: vi.fn(),
  });

  const stockService = new StockService(mockAuthService, mockStockRepository);

  test("Get product by ID", async () => {
    mockStockRepository.getById.mockResolvedValue({
      id: 1,
      productID: 1,
      quantity: 10,
      lowStockThreshold: 5,
      timestamp: new Date(),
    });

    const products = await stockService.getById(1);
    expect(products).toBeDefined();
  });

  test("Get All products", async () => {
    mockStockRepository.getAll.mockResolvedValue([]);
    const stocks = await stockService.getAll();
    expect(stocks).toBeDefined();
  });

  test("Set Quantity", async () => {
    mockStockRepository.getById.mockImplementation(async (id) => {
      if (id === 1) {
        return {
          id: 1,
          productID: 1,
          quantity: 10,
          lowStockThreshold: 5,
          timestamp: new Date(),
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockStockRepository.update.mockResolvedValue({
      id: 1,
      productID: 1,
      quantity: 20,
      lowStockThreshold: 5,
      timestamp: new Date(),
    });

    const product = await stockService.setQuantity(1, 1, {
      quantity: 20,
    });

    expect(product?.quantity).toBe(20);
  });

  test("Set Threshold", async () => {
    mockStockRepository.getById.mockImplementation(async (id) => {
      if (id === 1) {
        return {
          id: 1,
          productID: 1,
          quantity: 10,
          lowStockThreshold: 5,
          timestamp: new Date(),
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockStockRepository.update.mockResolvedValue({
      id: 1,
      productID: 1,
      quantity: 10,
      lowStockThreshold: 20,
      timestamp: new Date(),
    });

    const product = await stockService.setThreshold(1, 1, {
      lowStockThreshold: 20,
    });

    expect(product?.lowStockThreshold).toBe(20);
  });

  test("Decrement Stock", async () => {
    mockStockRepository.getById.mockImplementation(async (id) => {
      if (id === 1) {
        return {
          id: 1,
          productID: 1,
          quantity: 10,
          lowStockThreshold: 5,
          timestamp: new Date(),
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockStockRepository.update.mockResolvedValue({
      id: 1,
      productID: 1,
      quantity: 9,
      lowStockThreshold: 20,
      timestamp: new Date(),
    });

    const product = await stockService.decrementStock(1, 1);
    expect(product?.quantity).toBe(9);
  });

  test("Delete product", async () => {
    mockStockRepository.delete.mockResolvedValue();
    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    await stockService.delete(1, 1);
  });
});
