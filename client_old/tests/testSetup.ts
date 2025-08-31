import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

/**
 * Sets up an in-memory SQLite database and runs all migrations.
 * Returns the {@link Database} client.
 */
export const setupDb = () => {
  const client = new Database(":memory:");
  const db = drizzle(client);
  migrate(db, { migrationsFolder: "migrations" });
  return { client, db };
};

export const teardownDb = (client: Database.Database) => {
  client.close();
};
