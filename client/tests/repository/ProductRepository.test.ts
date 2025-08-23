import { afterAll, beforeAll, expect, test } from "vitest";
import { IProductRepository } from "../../src/database/interfaces/IProductRepository";
import { ProductRepository } from "../../src/database/repository/ProductRepository";
import { setupDb } from "../testSetup";
import { productTable } from "../../src/database/schema";

let client: any;
let db: any;
let productRepository: IProductRepository;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;
  db.run("PRAGMA foreign_keys = OFF;");
  productRepository = new ProductRepository(db);
});

afterAll(() => {
  db.delete(productTable).run();
  client.close();
});

test("Create product", async () => {
  await productRepository.create({
    name: "Lays Chips",
    buyPrice: 100,
    sellPrice: 120,
    quantity: 10,
    lowStockThreshold: 5,
    addedBy: 1,
  });

  const createdProduct = await productRepository.getById(1);
  expect(createdProduct?.name).toEqual("Lays Chips");
});

test("Get product by ID", async () => {
  const products = await productRepository.getById(1);
  expect(products).toBeDefined();
});

test("Get All products", async () => {
  const products = await productRepository.getAll();
  expect(products).toBeDefined();
});

test("Search products", async () => {
  const products = await productRepository.getAll("Lays Chips");
  expect(products.length).toBeGreaterThan(0);
  expect(products[0].name).toBe("Lays Chips");
});

test("Search non-existent product", async () => {
  const products = await productRepository.getAll("Colgate");
  expect(products.length).toBe(0);
});

test("Update product", async () => {
  const product = await productRepository.update(1, {
    name: "Lays Salted Chips",
    buyPrice: 100,
    sellPrice: 130,
  });

  expect(product?.name).toBe("Lays Salted Chips");
  expect(product?.buyPrice).toBe(100);
  expect(product?.sellPrice).toBe(130);
});

test("Delete product", async () => {
  await productRepository.delete(1);
});
