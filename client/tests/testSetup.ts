import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

/**
 * Sets up an in-memory SQLite database and runs all migrations.
 * Returns the {@link Database} client and the {@link BetterSQLite3Database} object.
 */
export const setupDb = () => {
  const client = new Database(":memory:");
  const db = drizzle(client);
  migrate(db, { migrationsFolder: "./src/database/migrations" });
  return { client, db };
};

export const teardownDb = (client: Database.Database) => {
  client.close();
};
