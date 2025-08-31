import { afterAll, beforeAll, beforeEach, expect, test } from "vitest";
import { IProductRepository } from "../../src/database/interfaces/IProductRepository";
import { ProductRepository } from "../../src/database/repository/ProductRepository";
import { setupDb } from "../testSetup";
import { productTable } from "../../src/database/schema";
import Database from "better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

let db: BetterSQLite3Database;
let productRepository: IProductRepository;

beforeAll(async () => {
  db = setupDb();
  db.run("PRAGMA foreign_keys = OFF;");
  productRepository = new ProductRepository(db);
});

beforeEach(async () => {
  db.delete(productTable).run();
});

afterAll(() => {
  db.delete(productTable).run();
});

test("Create product", async () => {
  const product = await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });

  const createdProduct = await productRepository.getById(product.id);
  expect(createdProduct?.name).toEqual("Lays Chips");
});

test("Get product by ID", async () => {
  const product = await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });

  const products = await productRepository.getById(product.id);
  expect(products).toBeDefined();
});

test("Get All products", async () => {
  await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });

  await productRepository.create({
    name: "Colgate",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });
  const products = await productRepository.getAll();
  expect(products).toBeDefined();
  expect(products.length).toBe(2);
});

test("Search products", async () => {
  await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });

  await productRepository.create({
    name: "Salted Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });

  await productRepository.create({
    name: "Colgate",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });
  const products = await productRepository.getAll("Lays Chips");
  expect(products.length).toBe(2);
  expect(products[0].name).toBe("Lays Chips");
});

test("Search non-existent product", async () => {
  await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });
  const products = await productRepository.getAll("Colgate");
  expect(products.length).toBe(0);
});

test("Update product", async () => {
  const product = await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });

  const updatedProduct = await productRepository.update(product.id, {
    name: "Lays Salted Chips",
    buyPrice: 100,
    sellPrice: 130,
  });

  expect(updatedProduct?.name).toBe("Lays Salted Chips");
  expect(updatedProduct?.buyPrice).toBe(100);
  expect(updatedProduct?.sellPrice).toBe(130);
});

test("Delete product", async () => {
  const product = await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: "some user UUID",
  });

  await productRepository.delete(product.id);
});
