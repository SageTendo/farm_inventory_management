import { StockDTO, UpdateStockDTO } from "../../../shared/dto/stock";

/**
 * Interface for stock service
 */
export interface IStockService {
  /**
   * Retrieves a single stock entry by ID
   * @param id The ID of the stock entry to retrieve
   * @returns A promise that resolves to the stock entry if found, otherwise null
   */
  getById(stockId: string): Promise<StockDTO | null>;

  /**
   * Retrieves the stock entry for a product
   */
  getByProductId(productId: string): Promise<StockDTO | null>;

  /**
   * Updates the quantity of a stock entry
   * @param userId The ID of the user making the change
   * @param stockId The ID of the stock entry to update
   * @param entity The updated stock entry data
   * @returns A promise that resolves to the updated stock entry if successful, otherwise null
   */
  setQuantity(
    userId: string,
    stockId: string,
    entity: UpdateStockDTO
  ): Promise<StockDTO | null>;

  /**
   * Updates the low stock threshold of a stock entry
   * @param userId The ID of the user making the change
   * @param stockId The ID of the stock entry to update
   * @param entity The updated stock entry data
   * @returns A promise that resolves to the updated stock entry if successful, otherwise null
   */
  setThreshold(
    userId: string,
    stockId: string,
    entity: UpdateStockDTO
  ): Promise<StockDTO | null>;

  /**
   * Decrements the quantity of a stock entry by a given value.
   * @param userId The ID of the user making the change
   * @param stockId The ID of the stock to decrement quantity
   * @param value The value to decrement the quantity by
   * @returns A promise that resolves to the updated stock entry if successful, otherwise null
   */
  decrementStock(stockId: string, value: number): Promise<UpdateStockDTO>;

  /**
   * Deletes a stock entry
   * @param userId The user deleting the stock entry
   * @param stockId The stock to delet
   * @returns A promise that resolves when the stock entry is deleted
   */
  delete(userId: string, stockId: string): Promise<void>;
}
