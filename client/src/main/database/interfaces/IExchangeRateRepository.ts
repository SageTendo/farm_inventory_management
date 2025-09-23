import { ExchangeRateDTO, NewExchangeRateDTO } from "../../../shared/dto/exchangeRate";
/**
 * Interface for exchange rate repository
 */
export interface IExchangeRateRepository {
  /**
   * Sets a new exchange rate in the DB
   * @param data The exchange rate data to create
   * @returns A promise that resolves to the created exchange rate entity
   */
  set(data: NewExchangeRateDTO): Promise<ExchangeRateDTO>;

  /**
   * Retrieves all exchange rates from the DB
   * @returns A promise that resolves to an array of exchange rate entities
   */
  getAll(limit?: number, offset?: number): Promise<ExchangeRateDTO[]>;

  /**
   * Retrieves a specific exchange rate by its ID from the DB
   * @param exchangeRateID The ID of the exchange rate to retrieve
   * @returns A promise that resolves to the exchange rate entity if found, otherwise null
   */
  getById(exchangeRateID: string): Promise<ExchangeRateDTO | null>;
}
