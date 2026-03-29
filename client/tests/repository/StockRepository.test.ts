import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { StockRepository } from "../../src/main/database/repository/StockRepository";
import { setupDb } from "../testSetup";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { stockTable } from "../../src/main/database";
import { ProductRepository } from "../../src/main/database/repository/ProductRepository";

describe("StockRepository", () => {
  let stockRepository: StockRepository;
  let productRepository: ProductRepository;
  let db: BetterSQLite3Database;

  beforeAll(() => {
    db = setupDb();
    db.run("PRAGMA foreign_keys = OFF;");
    stockRepository = new StockRepository(db);
    productRepository = new ProductRepository(db);

    productRepository.create({
      name: "Lays Chips",
      buyPrice: 100,
      sellPrice: 120,
      quantity: 0,
      lowStockThreshold: 5,
      addedBy: "some user UUID",
    });
    productRepository.create({
      name: "Colgate",
      buyPrice: 100,
      sellPrice: 120,
      quantity: 4,
      lowStockThreshold: 5,
      addedBy: "some user UUID",
    });
    productRepository.create({
      name: "Lays Salted Chips",
      buyPrice: 100,
      sellPrice: 120,
      quantity: 10,
      lowStockThreshold: 5,
      addedBy: "some user UUID",
    });
    productRepository.create({
      name: "Nutella",
      buyPrice: 100,
      sellPrice: 120,
      quantity: 10,
      lowStockThreshold: 5,
      addedBy: "some user UUID",
    });
  });

  afterAll(() => {
    db.delete(stockTable).run();
  });

  it("should retrieve stock by product ID", async () => {
    const product = await productRepository.create({
      name: "Stock By Product Test",
      buyPrice: 100,
      sellPrice: 120,
      quantity: 10,
      lowStockThreshold: 5,
      addedBy: "some user UUID",
    });
    const stock = await stockRepository.getByProductId(product.id);
    expect(stock).not.toBeNull();
    expect(stock?.productID).toBe(product.id);
    expect(stock?.quantity).toBe(10);
  });

  it("should retrieve a single stock entry by stock ID", async () => {
    const product = await productRepository.create({
      name: "Stock By Id Test",
      buyPrice: 100,
      sellPrice: 120,
      quantity: 10,
      lowStockThreshold: 5,
      addedBy: "some user UUID",
    });
    const byProduct = await stockRepository.getByProductId(product.id);
    expect(byProduct).not.toBeNull();
    const stock = await stockRepository.getById(byProduct!.id);
    expect(stock?.quantity).toBe(10);
    expect(stock?.productID).toBe(product.id);
  });

  it("should retrieve stock entries with low stock", async () => {
    const stocks = await stockRepository.getLowStock();
    expect(stocks.stocks).toBeInstanceOf(Array);
    expect(stocks.total).toBeGreaterThan(0);
  });

  it("should retrieve stock entries with no stock", async () => {
    const stocks = await stockRepository.getOutOfStock();
    expect(stocks.stocks).toBeInstanceOf(Array);
    expect(stocks.total).toBeGreaterThan(0);
  });
});
