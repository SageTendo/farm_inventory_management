import {
  ExchangeRateDTO,
  NewExchangeRateDTO,
} from "../../database/schema/types";

/**
 * Interface for exchange rate service
 */
export interface IExchangeRateService {
  /**
   * Sets a new exchange rate
   * @param data The exchange rate data to create
   * @returns A promise that resolves to the created exchange rate entity
   */
  set(data: NewExchangeRateDTO): Promise<ExchangeRateDTO>;

  /**
   * Retrieves all exchange rates
   * @returns A promise that resolves to an array of exchange rate entities
   */
  getAll(limit?: number, offset?: number): Promise<ExchangeRateDTO[]>;

  /**
   * Retrieves a specific exchange rate by its ID
   * @param exchangeRateId The ID of the exchange rate to retrieve
   * @returns A promise that resolves to the exchange rate entity if found, otherwise null
   */
  getById(exchangeRateId: string): Promise<ExchangeRateDTO | null>;
}
