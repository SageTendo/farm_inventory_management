import { NewStockDTO, StockDTO, UpdateStockDTO } from "../schema/types";
/**
 * Interface for stock repository
 */
export interface IStockRepository {
  /**
   * Creates a new stock entry
   * @param data The stock data to create
   * @returns A promise that resolves to the created stock entry
   */
  createStock(data: NewStockDTO): Promise<StockDTO>;

  /**
   * Retrieves all stock entries
   * @param limit The maximum number of stock entries to retrieve (optional)
   * @param offset The number of stock entries to skip before retrieving (optional)
   * @returns A promise that resolves to an array of stock entries
   */
  getAllStocks(limit?: number, offset?: number): Promise<StockDTO[]>;

  /**
   * Retrieves a single stock entry by ID
   * @param id The ID of the stock entry to retrieve
   * @returns A promise that resolves to the stock entry if found, otherwise null
   */
  getStockById(id: number): Promise<StockDTO | null>;

  /**
   * Updates a stock entry by ID
   * @param id The ID of the stock entry to update
   * @param data The updated stock data
   * @returns A promise that resolves to the updated stock entry
   */
  updateStock(id: number, data: UpdateStockDTO): Promise<StockDTO>;

  /**
   * Deletes a stock entry by ID
   * @param id The ID of the stock entry to delete
   * @returns A promise that resolves when the stock entry is deleted
   */
  deleteStock(id: number): Promise<void>;
}
