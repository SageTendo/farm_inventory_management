import { drizzle } from "drizzle-orm/better-sqlite3";

const db = drizzle(process.env.DATABASE_URL);

async function main() {
  db.run("PRAGMA journal_mode = WAL;");
  db.run("PRAGMA foreign_keys = ON;");
}
main();
