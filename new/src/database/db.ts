import { drizzle } from "drizzle-orm/libsql";
import { env } from "../config.ts";
import { join } from "path";
import fs from "fs";
import { createClient } from "@libsql/client/node";

export function initDb(
  path: string = env.DB_PATH,
  file: string = join(env.DB_PATH, env.DB_NAME)
) {
  if (!fs.existsSync(path)) {
    console.log("Creating db path");
    fs.mkdirSync(path, { recursive: true });
  }

  if (!fs.existsSync(file)) {
    console.log("Creating db file");
    fs.writeFileSync(file, "");
  }

  const dbURL = "file:/" + file;
  const client = createClient({
    url: dbURL,
    offline: true,
  });
  const db = drizzle(client);
  db.run("PRAGMA journal_mode = WAL;");
  db.run("PRAGMA foreign_keys = ON;");
  console.log("Database creation and configuration complete...");
  return db;
}

initDb();
