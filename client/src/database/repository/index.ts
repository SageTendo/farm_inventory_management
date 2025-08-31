import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

/**
 * Base class for a generic repository that can be used to interact with a database
 */
export abstract class BaseRepository {
  protected dbContext: BetterSQLite3Database;
  constructor(dbContext: any) {
    this.dbContext = dbContext;
  }
}
