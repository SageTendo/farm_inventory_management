import { BaseRepository } from ".";
import { IExchangeRateRepository } from "../interfaces/IExchangeRateRepository";
import { NewExchangeRateDTO, ExchangeRateDTO } from "../schema/types";
import { exchangeRateTable } from "../schema";
import { eq } from "drizzle-orm";

export class ExchangeRateRepository
  extends BaseRepository
  implements IExchangeRateRepository
{
  async set(data: NewExchangeRateDTO): Promise<ExchangeRateDTO> {
    const created = await this.dbContext
      .insert(exchangeRateTable)
      .values(data)
      .returning()
      .get();
    return created;
  }

  async getAll(limit: number = 10, offset: number): Promise<ExchangeRateDTO[]> {
    return await this.dbContext
      .select()
      .from(exchangeRateTable)
      .limit(limit)
      .offset(offset);
  }

  async getById(id: string): Promise<ExchangeRateDTO | null> {
    const rate = await this.dbContext
      .select()
      .from(exchangeRateTable)
      .where(eq(exchangeRateTable.id, id))
      .get();
    return rate || null;
  }
}
