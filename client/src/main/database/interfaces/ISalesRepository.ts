import { SaleDTO, NewSaleDTO, NewSaleItemDTO } from "../../../shared/dto/sale";

export interface ISalesRepository {
  /**
   * Processes a sale and it's items.
   * @param sale The sale data without items.
   * @param items The items of the sale.
   * @returns The saved sale data.
   */
  processSale(sale: NewSaleDTO, items: NewSaleItemDTO[]): Promise<SaleDTO>;

  /**
   * Retrieves a sale by its ID.
   * @param saleId The ID of the sale to retrieve
   * @returns The sale if found, otherwise null
   */
  getSaleById(saleId: string): Promise<SaleDTO>;

  /**
   * Retrieves all sales that occurred between the given dates.
   * @param start The start date (inclusive).
   * @param end The end date (inclusive).
   * @returns An array of sales that occurred between the given dates.
   */
  getSales(start: Date, end: Date): Promise<SaleDTO[]>;
}
