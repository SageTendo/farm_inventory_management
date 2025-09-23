import { eq } from "drizzle-orm";
import { BaseRepository } from ".";
import { stockTable } from "..";
import { IStockRepository } from "../interfaces/IStockRepository";
import { StockDTO, UpdateStockDTO } from "../../../shared/dto/stock";

/**
 * Repository class to handle CRUD operations for stock entities.
 */
export class StockRepository
  extends BaseRepository
  implements IStockRepository
{
  /**
   * Retrieves all stock entries with optional pagination
   * @param limit limit Max number of entries to retrieve (default 10)
   * @param offset offset Number of entries to skip (default 0)
   * @returns An array of stock entries
   */
  async getAll(limit = 10, offset = 0): Promise<StockDTO[]> {
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
  async getById(stockId: string): Promise<StockDTO | null> {
    const stock = await this.dbContext
      .select()
      .from(stockTable)
      .where(eq(stockTable.id, stockId))
      .get();
    return stock || null;
  }

  /**
   * Updates a stock entry by ID
   * @param id The ID of the stock entry to update
   * @param data The updated stock data
   * @returns The updated stock entry
   */
  async update(stockId: string, data: UpdateStockDTO): Promise<StockDTO> {
    const [stock] = await this.dbContext
      .update(stockTable)
      .set(data)
      .where(eq(stockTable.id, stockId))
      .returning();
    return stock || null;
  }

  /**
   * Deletes a stock entry by ID
   * @param id The ID of the stock entry to delete
   * @returns A promise that resolves when the stock entry is deleted
   */
  async delete(stockId: string): Promise<void> {
    this.dbContext.delete(stockTable).where(eq(stockTable.id, stockId)).run();
  }
}
