import { exec } from "child_process";
import * as fs from "node:fs";
import { promisify } from "util";
import { env } from "../src/config";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

const execAsync = promisify(exec);

interface execResponse {
  success: boolean;
  message: string;
}

async function create_db(): Promise<execResponse> {
  console.log(`${GREEN}📦 Creating database...${RESET}`);
  if (fs.existsSync(env.DB_FILE as string)) {
    return {
      success: true,
      message: `${YELLOW}⚠️  Database already exists! Skipping creation...${RESET}`,
    };
  }

  try {
    const { stdout, stderr } = await execAsync(`npx tsx ${env.DB_PATH}/db.ts`);
    const message = stderr
      ? `${YELLOW}⚠️ ${stderr}${RESET}`
      : `${GREEN}${stdout}${RESET}`;
    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: `${RED}❌ Error: ${error}${RESET}`,
    };
  }
}

async function push_db_schema(): Promise<execResponse> {
  console.log(`${GREEN}📦 Pushing database schema...${RESET}`);
  try {
    const { stdout, stderr } = await execAsync("npx drizzle-kit push");

    const message = stderr
      ? `${YELLOW}⚠️ ${stderr}${RESET}`
      : `${GREEN}✅ ${stdout}${RESET}`;

    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: `${RED}❌ Error: ${error}${RESET}`,
    };
  }
}

async function generate_migrations(): Promise<execResponse> {
  console.log(`${GREEN}🧬 Generating migrations...${RESET}`);
  try {
    const { stdout, stderr } = await execAsync("npx drizzle-kit generate");

    const message = stderr
      ? `${YELLOW}⚠️ ${stderr}${RESET}`
      : `${GREEN}✅ ${stdout}${RESET}`;

    return { success: true, message };
  } catch (error) {
    return {
      success: false,
      message: `${RED}❌ Error: ${error}${RESET}`,
    };
  }
}

function delete_db_files() {
  const dbFilesRegex = new RegExp("(.*).db(.*)");
  console.log(`${BLUE}Deleting database...${RESET}`);
  const databaseDir = env.DB_PATH as string;
  for (const file of fs.readdirSync(databaseDir)) {
    if (file.match(dbFilesRegex)) {
      fs.unlinkSync(databaseDir + "/" + file);
      console.log(`${BLUE}✅ ${file} deleted${RESET}`);
    }
  }
}

async function main() {
  if (!env.DB_FILE) {
    console.error(`${RED}DB_FILE environment variable is not set${RESET}`);
    return;
  }

  // Delete all database files
  if (process.argv.length > 2 && process.argv[2] === "DELETE") {
    delete_db_files();
    return;
  }

  const dbCreated = await create_db();
  if (!dbCreated.success) {
    console.error(dbCreated.message);
    console.error(`${RED}Failed to create database${RESET}`);
    return;
  } else {
    console.log("✅ ", dbCreated.message);
  }

  const schemaPushed = await push_db_schema();
  if (!schemaPushed.success) {
    console.error(schemaPushed.message);
    console.error(`${RED}Failed to push schema${RESET}`);
    return;
  } else {
    console.log(schemaPushed.message);
    console.log(`${GREEN}✅ Schema pushed${RESET}\n`);
  }

  const migrationsGenerated = await generate_migrations();
  if (!migrationsGenerated.success) {
    console.error(migrationsGenerated.message);
    console.error(`${RED}Failed to generate migrations${RESET}`);
    return;
  } else {
    console.log(migrationsGenerated.message);
    console.log(`${GREEN}✅ Migrations generated${RESET}\n`);
  }
}

main();
