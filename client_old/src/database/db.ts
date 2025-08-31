import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../config.ts";
import { join } from "path";
import fs from "fs";

export function initDb(
  path: string = env.DB_PATH,
  file: string = join(env.DB_PATH, env.DB_NAME)
) {
  if (!fs.existsSync(path)) {
    console.log("Creating db path");
    fs.mkdirSync(path, { recursive: true });
  }

  const db = drizzle(file);
  db.run("PRAGMA journal_mode = WAL;");
  db.run("PRAGMA foreign_keys = ON;");
  console.log("Database creation and configuration complete...");
  return db;
}

initDb();
