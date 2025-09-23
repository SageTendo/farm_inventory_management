import { z } from "zod";

export const ExchangeRateDTO = z.object({
  id: z.string(),
  rate: z.number().positive(),
  updatedBy: z.string(),
  updatedAt: z.date(),
});
export const NewExchangeRateDTO = ExchangeRateDTO.omit({ id: true });

export type ExchangeRateDTO = z.infer<typeof ExchangeRateDTO>;
export type NewExchangeRateDTO = z.infer<typeof NewExchangeRateDTO>;
