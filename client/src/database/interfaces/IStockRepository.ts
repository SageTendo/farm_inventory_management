/**
 * Interface for stock repository
 */
export interface IStockRepository {
  /**
   * Creates a new stock entry
   * @param data The stock data to create
   * @returns A promise that resolves to the created stock entry
   */
  createStock(data: any): Promise<any>;

  /**
   * Retrieves all stock entries
   * @returns A promise that resolves to an array of stock entries
   */
  getAllStocks(): Promise<any>;

  /**
   * Retrieves a single stock entry by ID
   * @param id The ID of the stock entry to retrieve
   * @returns A promise that resolves to the stock entry if found, otherwise null
   */
  getStockById(id: number): Promise<any>;

  /**
   * Updates a stock entry by ID
   * @param id The ID of the stock entry to update
   * @param data The updated stock data
   * @returns A promise that resolves to the updated stock entry
   */
  updateStock(id: number, data: any): Promise<any>;

  /**
   * Deletes a stock entry by ID
   * @param id The ID of the stock entry to delete
   * @returns A promise that resolves when the stock entry is deleted
   */
  deleteStock(id: number): Promise<any>;
}
