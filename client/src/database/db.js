"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
exports.db = (0, better_sqlite3_1.drizzle)(process.env.DATABASE_URL);
console.log("Creating and configuring application database...");
exports.db.run("PRAGMA journal_mode = WAL;");
exports.db.run("PRAGMA foreign_keys = ON;");
console.log("Database creationg and configuration complete...");
