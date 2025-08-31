import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../../config";
import { join } from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { app } from "electron";
// import { app } from "electron";

function initDb(
  path: string = env.DB_PATH,
  file: string = join(env.DB_PATH, env.DB_NAME)
) {
  const inMemory = file === "memory";
  const dbURL = inMemory ? ":memory:" : "file:/" + file;

  if (!inMemory) {
    if (!fs.existsSync(path)) {
      console.log("Creating db path:", path);
      fs.mkdirSync(path, { recursive: true });
    }

    if (!fs.existsSync(file)) {
      console.log("Creating db file:", file);
      fs.writeFileSync(file, "");
    }
  }

  const sqlite = new Database(dbURL);
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: "migrations" });

  if (!inMemory) {
    db.run("PRAGMA journal_mode = WAL;");
    db.run("PRAGMA foreign_keys = ON;");
  }

  if (process.env.NODE_ENV !== "test")
    console.log(`Database initialized (${inMemory ? "in-memory" : file})`);
  return db;
}

export const getDb = () => {
  switch (process.env.NODE_ENV) {
    case "dev":
      return initDb();
    case "test":
      return initDb("", "memory");
    case "prod":
      return initDb(app.getPath("userData"), "app.db");
  }
};
