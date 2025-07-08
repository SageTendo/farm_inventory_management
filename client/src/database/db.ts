import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../config.ts";

export const db = drizzle(env.DB_FILE as string);

db.run("PRAGMA journal_mode = WAL;");
db.run("PRAGMA foreign_keys = ON;");
console.log("Database creation and configuration complete...");
