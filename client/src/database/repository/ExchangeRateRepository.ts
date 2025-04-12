import { IGenericRepository } from ".";
import { ExchangeRate, NewExchangeRate } from "../schema/types";

export class ExchangeRateRepository
  implements IGenericRepository<ExchangeRate, NewExchangeRate, null>
{
  create(entity: NewExchangeRate): Promise<ExchangeRate> {
    // TODO: Create exchange rate
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<ExchangeRate[]> {
    // TODO: Get all exchange rates
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<ExchangeRate | null> {
    // TODO: Get exchange rate by id
    throw new Error("Method not implemented.");
  }

  update(id: number, entity: null): Promise<null> {
    throw new Error("Exchange rate is immutable.");
  }

  delete(id: number): Promise<void> {
    // TODO: Delete exchange rate
    throw new Error("Method not implemented.");
  }
}
