import { drizzle } from "drizzle-orm/better-sqlite3";

export const db = drizzle(process.env.DATABASE_URL);

console.log("Creating and configuring application database...");
db.run("PRAGMA journal_mode = WAL;");
db.run("PRAGMA foreign_keys = ON;");
console.log("Database creationg and configuration complete...");
