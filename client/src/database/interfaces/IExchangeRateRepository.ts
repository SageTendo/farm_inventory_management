import { NewExchangeRateDTO, ExchangeRateDTO } from "../schema/types";

/**
 * Interface for exchange rate repository
 */
export interface IExchangeRateRepository {
  /**
   * Sets a new exchange rate
   * @param data The exchange rate data to create
   * @returns A promise that resolves to the created exchange rate entity
   */
  setExchangeRate(data: NewExchangeRateDTO): Promise<ExchangeRateDTO>;

  /**
   * Retrieves all exchange rates
   * @returns A promise that resolves to an array of exchange rate entities
   */
  getAllExchangeRates(): Promise<ExchangeRateDTO[]>;

  /**
   * Retrieves a specific exchange rate by its ID
   * @param id The ID of the exchange rate to retrieve
   * @returns A promise that resolves to the exchange rate entity if found, otherwise null
   */
  getExchangeRateById(id: number): Promise<ExchangeRateDTO | null>;
}
