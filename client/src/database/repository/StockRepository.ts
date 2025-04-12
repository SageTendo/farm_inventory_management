import { IGenericRepository } from ".";
import { Stock, NewStock, UpdateStock } from "../schema/types";

export class StockRepository
  implements IGenericRepository<Stock, NewStock, UpdateStock>
{
  create(entity: NewStock): Promise<Stock> {
    // TODO: Create stock
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Stock[]> {
    // TODO: Get all stocks
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Stock | null> {
    // TODO: Get stock by id
    throw new Error("Method not implemented.");
  }

  update(id: number, entity: UpdateStock): Promise<Stock | null> {
    // TODO: Update stock
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<void> {
    // TODO: Delete stock
    throw new Error("Method not implemented.");
  }
}
