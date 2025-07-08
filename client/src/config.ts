import { config } from "dotenv";
import dotenvExpand from "dotenv-expand";

const configEnv = config();
dotenvExpand.expand(configEnv);

export const env = {
  // === App Configuration ===
  SECRET_KEY: process.env.SECRET_KEY || "development",

  // === Database Configuration ===
  DB_NAME: process.env.DB_NAME || "app",
  DB_PATH: process.env.DB_PATH || "./src/database",
  DB_FILE: process.env.DB_FILE || "./src/database/app.db",
  DB_MIGRATIONS_PATH:
    process.env.DB_MIGRATIONS_PATH || "./src/database/migrations",
};
