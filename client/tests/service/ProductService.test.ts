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
import { IProductRepository } from "../../src/database/interfaces/IProductRepository";
import { ProductService } from "../../src/service/ProductService";
import { IAuthService } from "../../src/service/interfaces/IAuthService";

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

describe("ProductService", () => {
  const mockProductRepository = vi.mocked<IProductRepository>({
    create: vi.fn(),
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

  const productService = new ProductService(
    mockAuthService,
    mockProductRepository
  );

  test("Create a new product", async () => {
    mockAuthService.hasRequiredRole.mockResolvedValue(true);

    const date = new Date();
    mockProductRepository.create.mockResolvedValue({
      id: "UUID",
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      addedBy: "user UUID",
      quantity: 10,
      lowStockThreshold: 5,
      isDeleted: false,
      createdAt: date,
    });

    mockProductRepository.create;
    const product = await productService.create({
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      quantity: 10,
      lowStockThreshold: 5,
      addedBy: "user UUID",
    });

    expect(product).toBeDefined();
    expect(product).toEqual({
      id: "UUID",
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      addedBy: "user UUID",
      isDeleted: false,
      createdAt: date,
      quantity: 10,
      lowStockThreshold: 5,
    });
  });

  test("Get product by ID", async () => {
    mockProductRepository.getById.mockResolvedValue({
      id: "UUID",
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      addedBy: "user UUID",
      isDeleted: false,
      createdAt: new Date(),
      quantity: 10,
      lowStockThreshold: 5,
    });

    const products = await productService.getById("UUID");
    expect(products).toBeDefined();
  });

  test("Get All products", async () => {
    mockProductRepository.getAll.mockResolvedValue([]);
    const products = await productService.getAll();
    expect(products).toBeDefined();
  });

  test("Search products", async () => {
    mockProductRepository.getAll.mockImplementation(async (name) => {
      if (name === "Lays Chips") {
        return [
          {
            id: "UUID",
            name: "Lays Chips",
            buyPrice: 100,
            sellPrice: 120,
            addedBy: "user UUID",
            isDeleted: false,
            createdAt: new Date(),
            quantity: 10,
            lowStockThreshold: 5,
          },
        ];
      }
      return [];
    });

    const products = await productService.getAll("Lays Chips");
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].name).toBe("Lays Chips");
  });

  test("Search non-existent product", async () => {
    mockProductRepository.getAll.mockImplementation(async (name) => {
      if (name === "Lays Chips") {
        return [
          {
            id: "UUID",
            name: "Lays Chips",
            buyPrice: 100,
            sellPrice: 120,
            addedBy: "user UUID",
            isDeleted: false,
            createdAt: new Date(),
            quantity: 10,
            lowStockThreshold: 5,
          },
        ];
      }
      return [];
    });
    const products = await productService.getAll("Colgate");
    expect(products.length).toBe(0);
  });

  test("Update product", async () => {
    mockProductRepository.getById.mockImplementation(async (id) => {
      if (id === "UUID") {
        return {
          id: "UUID",
          name: "Lays Salted Chips",
          buyPrice: 100,
          sellPrice: 130,
          addedBy: "user UUID",
          isDeleted: false,
          createdAt: new Date(),
          quantity: 10,
          lowStockThreshold: 5,
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockProductRepository.update.mockResolvedValue({
      id: "UUID",
      name: "Lays Salted Chips",
      buyPrice: 100,
      sellPrice: 130,
      addedBy: "user UUID",
      isDeleted: false,
      createdAt: new Date(),
      quantity: 10,
      lowStockThreshold: 5,
    });

    const product = await productService.update("user UUID", "UUID", {
      name: "Lays Salted Chips",
      buyPrice: 100,
      sellPrice: 130,
    });

    expect(product?.name).toBe("Lays Salted Chips");
    expect(product?.buyPrice).toBe(100);
    expect(product?.sellPrice).toBe(130);
  });

  test("Delete product", async () => {
    mockProductRepository.delete.mockResolvedValue();
    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    await productService.delete("user UUID", "UUID");
  });
});
