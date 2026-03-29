import { eq, lte } from "drizzle-orm";
import { BaseRepository } from ".";
import { stockTable } from "..";
import { IStockRepository } from "../interfaces/IStockRepository";
import {
  StockDTO,
  StockListDTO,
  UpdateStockDTO,
} from "../../../shared/dto/stock";

/**
 * Repository class to handle CRUD operations for stock entities.
 */
export class StockRepository
  extends BaseRepository
  implements IStockRepository {

  /**
   * Finds a specific stock entry by ID
   * @param id The ID of the stock entry to retrieve
   * @returns The stock entry or null if not found
   */
  async getById(stockId: string): Promise<StockDTO | null> {
    const stock = this.dbContext
      .select()
      .from(stockTable)
      .where(eq(stockTable.id, stockId))
      .get();
    return stock || null;
  }

  async getByProductId(productId: string): Promise<StockDTO | null> {
    const stock = this.dbContext
      .select()
      .from(stockTable)
      .where(eq(stockTable.productID, productId))
      .get();
    return stock || null;
  }

  async getLowStock(limit = 10, offset = 0): Promise<StockListDTO> {
    const stocks = this.dbContext
      .select()
      .from(stockTable)
      .where(lte(stockTable.quantity, stockTable.lowStockThreshold))
      .limit(limit)
      .offset(offset)
      .all();

    return {
      stocks: stocks,
      total: stocks.length,
    };
  }

  async getOutOfStock(limit = 10, offset = 0): Promise<StockListDTO> {
    const stocks = this.dbContext
      .select()
      .from(stockTable)
      .where(eq(stockTable.quantity, 0))
      .limit(limit)
      .offset(offset)
      .all();

    return {
      stocks: stocks,
      total: stocks.length,
    };
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
