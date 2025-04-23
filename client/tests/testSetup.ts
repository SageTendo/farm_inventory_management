import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

export const setupDb = () => {
  const client = new Database(":memory:");
  const db = drizzle(client);
  migrate(db, { migrationsFolder: "./src/database/migrations" });
  return { client, db };
};

export const teardownDb = (client: unknown) => {
  client.close();
};
