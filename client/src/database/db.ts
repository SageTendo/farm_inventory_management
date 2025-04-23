import { drizzle } from "drizzle-orm/better-sqlite3";
import { config } from "dotenv";
import dotenvExpand from "dotenv-expand";

const env = config();
dotenvExpand.expand(env);

export const db = drizzle(process.env.DB_FILE as string);

db.run("PRAGMA journal_mode = WAL;");
db.run("PRAGMA foreign_keys = ON;");
console.log("Database creation and configuration complete...");
