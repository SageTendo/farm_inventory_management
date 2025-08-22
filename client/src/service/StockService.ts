import { StockRepository } from "../database/repository/StockRepository";
import {
  StockDTO,
  UpdateStockDTO,
  NewStockDTO,
} from "../database/schema/types";

export class StockService {
  private stockRepository: StockRepository;

  constructor(stockRepository: StockRepository) {
    this.stockRepository = stockRepository;
  }

  /**
   * Adds stock to an existing stock entry or creates a new one if it doesn't exist
   * @param id The ID of the stock entry
   * @param quantity The quantity to add
   * @param name The name of the stock item (required if creating a new entry)
   * @returns The updated or newly created stock entry
   */
  async addStock(
    id: number,
    quantity: number,
    name?: string
  ): Promise<StockDTO> {

    type NewStockWithNameDTO = NewStockDTO & { name: string } & { quantity: number};
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    // Check if the stock entry exists
    const stock = await this.stockRepository.getStockById(id);

    if (stock) {
      // If the stock entry exists, update the quantity
      const updatedData: UpdateStockDTO = {
        quantity: stock.quantity + quantity,
      };
      return await this.stockRepository.updateStock(id, updatedData);
    } else {
      // If the stock entry does not exist, create an entry
      if (!name) {
        throw new Error("Name is required to create a new stock entry");
      }
      const newStock: NewStockWithNameDTO = {
        name,
        quantity,
        productID: 0, // Replace with appropriate value
        timestamp: new Date(), // Replace with appropriate value if needed
        lowStockThreshold: 10, // Replace with appropriate value
      };
      return await this.stockRepository.createStock(newStock);
    }
  }

  /**
   * Adds multiple stock entries to the database
   * @param stocks Array of NewStockDTO objects to add
   * @returns Array of created StockDTO entries
   */
  async addMultipleStocks(stocks: NewStockDTO[]): Promise<StockDTO[]> {
    const createdStocks: StockDTO[] = [];
    for (const stock of stocks) {
      const createdStock = await this.stockRepository.createStock(stock);
      createdStocks.push(createdStock);
    }
    return createdStocks;
  }

  /**
   * Retrieves all stock entries with optional pagination
   * @param limit The maximum number of entries to retrieve
   * @param offset The number of entries to skip
   * @returns An array of stock entries
   */
  async getAllStocks(
    limit: number = 10,
    offset: number = 0
  ): Promise<StockDTO[]> {
    return await this.stockRepository.getAllStocks(limit, offset);
  }
}
