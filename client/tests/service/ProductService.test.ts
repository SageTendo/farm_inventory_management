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
import { IProductRepository } from "../../src/database/interfaces/IProductRepository";
import { ProductService } from "../../src/service/ProductService";
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
      id: 1,
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      addedBy: 1,
      isDeleted: false,
      createdAt: date,
    });

    mockProductRepository.create;
    const product = await productService.create({
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      addedBy: 1,
    });

    expect(product).toBeDefined();
    expect(product).toEqual({
      id: 1,
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      addedBy: 1,
      isDeleted: false,
      createdAt: date,
    });
  });

  test("Get product by ID", async () => {
    mockProductRepository.getById.mockResolvedValue({
      id: 1,
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      addedBy: 1,
      isDeleted: false,
      createdAt: new Date(),
    });

    const products = await productService.getById(1);
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
            id: 1,
            name: "Lays Chips",
            buyPrice: 100,
            sellPrice: 120,
            addedBy: 1,
            isDeleted: false,
            createdAt: new Date(),
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
            id: 1,
            name: "Lays Chips",
            buyPrice: 100,
            sellPrice: 120,
            addedBy: 1,
            isDeleted: false,
            createdAt: new Date(),
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
      if (id === 1) {
        return {
          id: 1,
          name: "Lays Salted Chips",
          buyPrice: 100,
          sellPrice: 130,
          addedBy: 1,
          isDeleted: false,
          createdAt: new Date(),
        };
      }
      return null;
    });

    mockAuthService.hasRequiredRole.mockResolvedValue(true);
    mockProductRepository.update.mockResolvedValue({
      id: 1,
      name: "Lays Salted Chips",
      buyPrice: 100,
      sellPrice: 130,
      addedBy: 1,
      isDeleted: false,
      createdAt: new Date(),
    });

    const product = await productService.update(1, 1, {
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
    await productService.delete(1, 1);
  });
});
