import { LibSQLDatabase } from "drizzle-orm/libsql";

/**
 * Base class for a generic repository that can be used to interact with a database
 * @template DBType The type of the database context used to interact with the database.
 */
export abstract class BaseRepository {
  protected dbContext: LibSQLDatabase;
  constructor(dbContext: LibSQLDatabase) {
    this.dbContext = dbContext;
  }
}
