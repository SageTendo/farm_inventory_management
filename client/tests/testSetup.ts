import { getDb } from "../src/database/db";

/**
 * Sets up an in-memory SQLite database and runs all migrations.
 */
export const setupDb = () => {
  return getDb();
};
