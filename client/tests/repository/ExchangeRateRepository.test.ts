import { afterAll, beforeAll, expect, test } from "vitest";
import { IExchangeRateRepository } from "../../src/main/database/interfaces/IExchangeRateRepository";
import { ExchangeRateRepository } from "../../src/main/database/repository/ExchangeRateRepository";
import { setupDb } from "../testSetup";
import { productTable } from "../../src/main/database";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

let db: BetterSQLite3Database;
let exchangRateRepository: IExchangeRateRepository;

beforeAll(async () => {
  db = setupDb();
  db.run("PRAGMA foreign_keys = OFF;");
  exchangRateRepository = new ExchangeRateRepository(db);
});

afterAll(() => {
  db.delete(productTable).run();
});

let rateId = "";

test("Set exchange rate", async () => {
  const newRate = await exchangRateRepository.set({
    rate: 1.23,
    updatedBy: "some user UUID",
  });
  rateId = newRate.id;

  expect(newRate).toStrictEqual({
    id: newRate.id,
    rate: 1.23,
    updatedBy: "some user UUID",
    updatedAt: expect.any(Date),
  });
});

test("Get exchange rates", async () => {
  const rates = await exchangRateRepository.getAll();
  expect(rates).toBeDefined();
  expect(rates.length).toBeGreaterThan(0);
});

test("Get exchange rate by ID", async () => {
  const rate = await exchangRateRepository.getById(rateId);
  expect(rate).toStrictEqual({
    id: rate.id,
    rate: 1.23,
    updatedBy: "some user UUID",
    updatedAt: expect.any(Date),
  });
});
