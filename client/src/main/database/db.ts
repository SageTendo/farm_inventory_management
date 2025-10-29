import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../../config";
import { join } from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { app } from "electron";

function initDb(path: string = env.DB_PATH, file: string = env.DB_NAME) {
  console.error(process.cwd(), "<<< CWD");
  console.error(env.DB_MIGRATIONS_PATH, "<<< PATH");
  const inMemory = file === "memory";
  const dbPath = inMemory ? ":memory:" : join(path, file);

  if (!inMemory) {
    if (!fs.existsSync(path)) {
      console.log("Creating db path:", path);
      fs.mkdirSync(path, { recursive: true });
    }

    if (!fs.existsSync(dbPath)) {
      console.log("Creating db file:", file);
      fs.writeFileSync(dbPath, "");
    }
  }

  const sqlite = new Database(dbPath);
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: env.DB_MIGRATIONS_PATH });

  if (!inMemory) {
    db.run("PRAGMA journal_mode = WAL;");
    db.run("PRAGMA foreign_keys = ON;");
  }

  if (process.env.NODE_ENV !== "test")
    console.log(`Database initialized (${dbPath})`);
  return db;
}

export const getDb = () => {
  switch (process.env.NODE_ENV) {
    case "dev":
      return initDb();
    case "test":
      return initDb("", "memory");
    default:
      return initDb(app.getPath("userData"), "app.db");
  }
};
