import {
  StockDTO,
  StockListDTO,
  UpdateStockDTO,
} from "../../../shared/dto/stock";

/**
 * Interface for stock repository
 */
export interface IStockRepository {
  /**
   * Retrieves a single stock entry by ID
   * @param stockId The ID of the stock entry to retrieve
   * @returns A promise that resolves to the stock entry if found, otherwise null
   */
  getById(stockId: string): Promise<StockDTO | null>;

  /**
   * Retrieves the stock entry for a product (one row per product)
   */
  getByProductId(productId: string): Promise<StockDTO | null>;

  /**
   * Retrieves all stock entries with low stock
   * @returns A promise that resolves to an array of stock entries
   */
  getLowStock(limit?: number, offset?: number): Promise<StockListDTO>;

  /**
   * Retrieves all stock entries with no stock
   * @returns A promise that resolves to an array of stock entries
   */
  getOutOfStock(limit?: number, offset?: number): Promise<StockListDTO>;

  /**
   * Updates a stock entry by ID
   * @param stockId The ID of the stock entry to update
   * @param data The updated stock data
   * @returns A promise that resolves to the updated stock entry
   */
  update(stockId: string, data: UpdateStockDTO): Promise<StockDTO>;

  /**
   * Deletes a stock entry by ID
   * @param stockId The ID of the stock entry to delete
   * @returns A promise that resolves when the stock entry is deleted
   */
  delete(stockId: string): Promise<void>;
}
