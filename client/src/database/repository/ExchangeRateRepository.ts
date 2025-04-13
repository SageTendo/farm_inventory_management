import { IGenericRepository } from ".";
import { ExchangeRateDTO, NewExchangeRateDTO } from "../schema/types";

export class ExchangeRateRepository
  implements IGenericRepository<ExchangeRateDTO, NewExchangeRateDTO, null>
{
  async create(entity: NewExchangeRateDTO): Promise<ExchangeRateDTO> {
    throw new Error("Method not implemented.");
  }

  async getAll(limit?: number, offset?: number): Promise<ExchangeRateDTO[]> {
    throw new Error("Method not implemented.");
  }

  async getById(id: number): Promise<ExchangeRateDTO | null> {
    throw new Error("Method not implemented.");
  }

  async update(id: number, entity: null): Promise<ExchangeRateDTO | null> {
    throw new Error("Exchange rate entry is immutable.");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
