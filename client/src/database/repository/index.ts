/**
 * Base class for a generic repository that can be used to interact with a database
 * @template DBType The type of the database context used to interact with the database.
 */
export abstract class BaseRepository<DBType> {
  protected dbContext: DBType;
  constructor(dbContext: DBType) {
    this.dbContext = dbContext;
  }
}
