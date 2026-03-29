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
import { roleTable } from "../../src/main/database";
import { setupDb } from "../testSetup";
import { IStockRepository } from "../../src/main/database/interfaces/IStockRepository";
import { StockService } from "../../src/main/service/StockService";
import { IAuthService } from "../../src/main/service/interfaces/IAuthService";

let db: BetterSQLite3Database<Record<string, never>>;

beforeAll(() => {
  db = setupDb();
});

afterAll(async () => {
  db.delete(roleTable).run();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("StockService", () => {
  const mockStockRepository = vi.mocked<IStockRepository>({
    getById: vi.fn(),
    getByProductId: vi.fn(),
    getLowStock: vi.fn(),
    getOutOfStock: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  });

  const mockAuthService = vi.mocked<IAuthService>({
    login: vi.fn(),
    register: vi.fn(),
    updatePassword: vi.fn(),
    updateRole: vi.fn(),
    hasRequiredRole: vi.fn(),
    signSession: vi.fn(),
    validateSession: vi.fn(),
  });

  const stockService = new StockService(mockAuthService, mockStockRepository);

  test("Get stock by ID", async () => {
    mockStockRepository.getById.mockResolvedValue({
      id: "stock UUID",
      productID: "product UUID",
      quantity: 10,
      lowStockThreshold: 5,
      timestamp: new Date(),
    });

    const stock = await stockService.getById("stock UUID");
    expect(stock).toBeDefined();
  });

  test("Get stock by product ID", async () => {
    mockStockRepository.getByProductId.mockResolvedValue({
      id: "stock UUID",
      productID: "product UUID",
      quantity: 10,
      lowStockThreshold: 5,
      timestamp: new Date(),
    });

    const stock = await stockService.getByProductId("product UUID");
    expect(stock?.productID).toBe("product UUID");
  });


  test("Set Quantity", async () => {
    mockStockRepository.getById.mockImplementation(async (id) => {
      if (id === "stock UUID") {
        return {
          id: "stock UUID",
          productID: "product UUID",
          quantity: 10,
          lowStockThreshold: 5,
          timestamp: new Date(),
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockStockRepository.update.mockResolvedValue({
      id: "stock UUID",
      productID: "product UUID",
      quantity: 20,
      lowStockThreshold: 5,
      timestamp: new Date(),
    });

    const product = await stockService.setQuantity("user UUID", "stock UUID", {
      quantity: 20,
    });

    expect(product?.quantity).toBe(20);
  });

  test("Set Threshold", async () => {
    mockStockRepository.getById.mockImplementation(async (id) => {
      if (id === "stock UUID") {
        return {
          id: "stock UUID",
          productID: "product UUID",
          quantity: 10,
          lowStockThreshold: 5,
          timestamp: new Date(),
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockStockRepository.update.mockResolvedValue({
      id: "stock UUID",
      productID: "product UUID",
      quantity: 10,
      lowStockThreshold: 20,
      timestamp: new Date(),
    });

    const product = await stockService.setThreshold("user UUID", "stock UUID", {
      lowStockThreshold: 20,
    });

    expect(product?.lowStockThreshold).toBe(20);
  });

  test("Decrement Stock", async () => {
    mockStockRepository.getById.mockImplementation(async (id) => {
      if (id === "stock UUID") {
        return {
          id: "stock UUID",
          productID: "product UUID",
          quantity: 10,
          lowStockThreshold: 5,
          timestamp: new Date(),
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockStockRepository.update.mockResolvedValue({
      id: "stock UUID",
      productID: "product UUID",
      quantity: 9,
      lowStockThreshold: 20,
      timestamp: new Date(),
    });

    const product = await stockService.decrementStock("stock UUID", 1);
    expect(product?.quantity).toBe(9);
  });

  test("Delete product", async () => {
    mockStockRepository.delete.mockResolvedValue();
    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    await stockService.delete("user UUID", "stock UUID");
  });
});
