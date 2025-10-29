import { config } from "dotenv";
import dotenvExpand from "dotenv-expand";

const configEnv = config();
dotenvExpand.expand(configEnv);

export const env = {
  // === App Configuration ===
  SECRET_KEY: process.env.SECRET_KEY || "development",

  // === Database Configuration ===
  DB_NAME: process.env.DB_NAME || "app.db",
  DB_PATH: process.env.DB_PATH || "./out/database",
  DB_MIGRATIONS_PATH: process.env.DB_MIGRATIONS_PATH || "./src/main/migrations",
  DB_ADMIN_USERNAME: process.env.DB_ADMIN_USERNAME || "admin",
  DB_ADMIN_PASSWORD: process.env.DB_ADMIN_PASSWORD || "admin123",

  // === ENCRYPTION ===
  SALT_ROUNDS: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
};
