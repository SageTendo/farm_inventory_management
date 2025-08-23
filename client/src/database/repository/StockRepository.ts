import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import { BaseRepository } from ".";
import { stockTable } from "../schema";
import { StockDTO, UpdateStockDTO } from "../schema/types";
import { IStockRepository } from "../interfaces/IStockRepository";

/**
 * Repository class to handle CRUD operations for stock entities.
 */
export class StockRepository
  extends BaseRepository<BetterSQLite3Database>
  implements IStockRepository
{
  /**
   * Retrieves all stock entries with optional pagination
   * @param limit limit Max number of entries to retrieve (default 10)
   * @param offset offset Number of entries to skip (default 0)
   * @returns An array of stock entries
   */
  async getAll(limit: number = 10, offset: number = 0): Promise<StockDTO[]> {
    return this.dbContext
      .select()
      .from(stockTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  /**
   * Finds a specific stock entry by ID
   * @param id The ID of the stock entry to retrieve
   * @returns The stock entry or null if not found
   */
  async getById(id: number): Promise<StockDTO | null> {
    const stock = this.dbContext
      .select()
      .from(stockTable)
      .where(eq(stockTable.id, id))
      .get();
    return stock || null;
  }

  /**
   * Updates a stock entry by ID
   * @param id The ID of the stock entry to update
   * @param data The updated stock data
   * @returns The updated stock entry
   */
  async update(id: number, data: UpdateStockDTO): Promise<StockDTO> {
    const [stock] = await this.dbContext
      .update(stockTable)
      .set(data)
      .where(eq(stockTable.id, id))
      .returning();
    return stock || null;
  }

  /**
   * Deletes a stock entry by ID
   * @param id The ID of the stock entry to delete
   * @returns A promise that resolves when the stock entry is deleted
   */
  async delete(id: number): Promise<void> {
    this.dbContext.delete(stockTable).where(eq(stockTable.id, id)).run();
  }
}
