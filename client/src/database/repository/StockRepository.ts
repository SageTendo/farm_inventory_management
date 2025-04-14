import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import { BaseRepository } from ".";
import { stockTable } from "../schema";
import { NewStockDTO, StockDTO, UpdateStockDTO } from "../schema/types";
import { IStockRepository } from "../interfaces/IStockRepository";

/**
 * Repository class to handle CRUD operations for stock entities.
 */

export class StockRepository 
    extends BaseRepository<BetterSQLite3Database>
    implements IStockRepository
{
    /**
     * Inserts a new stock entry into the datebase
     * @param data The stock data to insert 
     * @returns The created stock entry
     */
    async createStock(data: NewStockDTO): Promise<StockDTO> {
        const [stock] = await this.dbContext
          .insert(stockTable)
          .values(data)
          .returning();
        return stock;
    }

    /**
     * Retrieves all stock entries with optional pagination
     * @param limit limit Max number of entries to retrieve (default 10)
     * @param offset offset Number of entries to skip (default 0)
     * @returns An array of stock entries
     */
    async getAllStocks(limit: number = 10, offset: number = 0): Promise<StockDTO[]> {
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
    async getStockById(id: number): Promise<StockDTO | null> {
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
    async updateStock(id: number, data: UpdateStockDTO): Promise<StockDTO> {
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
    async deleteStock(id: number): Promise<void> {
        await this.dbContext
          .delete(stockTable)
          .where(eq(stockTable.id, id))
          .run();
    }

}