import { afterAll, beforeAll, expect, test } from "vitest";
import { IExchangeRateRepository } from "../../src/database/interfaces/IExchangeRateRepository";
import { ExchangeRateRepository } from "../../src/database/repository/ExchangeRateRepository";
import { setupDb } from "../testSetup";
import { productTable } from "../../src/database/schema";

let client: any;
let db: any;
let exchangRateRepository: IExchangeRateRepository;

beforeAll(async () => {
  const setup = setupDb();
  client = setup.client;
  db = setup.db;
  db.run("PRAGMA foreign_keys = OFF;");
  exchangRateRepository = new ExchangeRateRepository(db);
});

afterAll(() => {
  db.delete(productTable).run();
  client.close();
});

test("Set exchange rate", async () => {
  const newRate = await exchangRateRepository.set({
    rate: 1.23,
    updatedBy: 1,
  });

  expect(newRate).toStrictEqual({
    id: 1,
    rate: 1.23,
    updatedBy: 1,
    updatedAt: expect.any(Date),
  });
});

test("Get exchange rates", async () => {
  const rates = await exchangRateRepository.getAll();
  expect(rates).toBeDefined();
  expect(rates.length).toBeGreaterThan(0);
});

test("Get exchange rate by ID", async () => {
  const rate = await exchangRateRepository.getById(1);
  expect(rate).toStrictEqual({
    id: 1,
    rate: 1.23,
    updatedBy: 1,
    updatedAt: expect.any(Date),
  });
});
