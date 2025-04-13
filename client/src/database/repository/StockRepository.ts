import { IGenericRepository } from ".";
import { StockDTO, NewStockDTO, UpdateStockDTO } from "../schema/types";

export class StockRepository
  implements IGenericRepository<StockDTO, NewStockDTO, UpdateStockDTO>
{
  async create(entity: NewStockDTO): Promise<StockDTO> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getAll(limit?: number, offset?: number): Promise<StockDTO[]> {
    throw new Error("Method not implemented.");
  }

  async getById(id: number): Promise<StockDTO | null> {
    throw new Error("Method not implemented.");
  }

  async update(id: number, entity: UpdateStockDTO): Promise<StockDTO | null> {
    throw new Error("Method not implemented.");
  }
}
