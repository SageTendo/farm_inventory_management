import { BaseRepository } from ".";
import { IExchangeRateRepository } from "../interfaces/IExchangeRateRepository";
import { ExchangeRateDTO, NewExchangeRateDTO } from "../schema/types";
import { exchangeRateTable } from "../schema";
import { eq } from "drizzle-orm";

export class ExchangeRateRepository
  extends BaseRepository
  implements IExchangeRateRepository
{
  async set(data: NewExchangeRateDTO): Promise<ExchangeRateDTO> {
    return this.dbContext
      .insert(exchangeRateTable)
      .values(data)
      .returning()
      .get();
  }

  async getAll(limit = 10, offset: number): Promise<ExchangeRateDTO[]> {
    return this.dbContext
      .select()
      .from(exchangeRateTable)
      .limit(limit)
      .offset(offset)
      .all();
  }

  async getById(id: string): Promise<ExchangeRateDTO | null> {
    const rate = this.dbContext
      .select()
      .from(exchangeRateTable)
      .where(eq(exchangeRateTable.id, id))
      .get();
    return rate || null;
  }
}
