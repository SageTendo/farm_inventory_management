/**
 * Interface for a generic repository that can be used to interact with a database
 */
export interface IGenericRepository<Entity, NewEntity, UpdateEntity> {
  /**
   * Inserts a new entity into the database
   * @param entity A new entity to be inserted into the database
   */
  create(entity: NewEntity): Promise<Entity>;
  /**
   * Retrieves all entities from the database
   * @returns An array of entities
   */
  getAll(limit?: number, offset?: number): Promise<Entity[]>;
  /**
   * Retrieves an entity with the specified id from the database
   * @param id The id of the entity to retrieve
   */
  getById(id: number): Promise<Entity | null>;
  /**
   * Updates an entity with the specified id in the database
   * @param id The id of the entity to update
   * @param entity The updated entity
   */
  update(id: number, entity: UpdateEntity): Promise<Entity | null>;
  /**
   * Deletes an entity with the specified id from the database
   * @param id The id of the entity to delete
   * @returns A promise that resolves when the entity is deleted
   */
  delete(id: number): Promise<void>;
}
