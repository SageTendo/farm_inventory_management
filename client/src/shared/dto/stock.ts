import { z } from "zod";

export const StockDTO = z.object({
  id: z.string(),
  productID: z.string(),
  quantity: z.number(),
  lowStockThreshold: z.number(),
  timestamp: z.coerce.date(),
});
export const NewStockDTO = StockDTO.omit({ id: true, timestamp: true });

export const UpdateStockDTO = StockDTO.omit({
  id: true,
  productID: true,
  timestamp: true,
}).partial();

export const UserStockDTO = z.object({
  userID: z.string(),
  stockID: z.string(),
  quantity: z.number(),
});

export const StockListDTO = z.object({
  stocks: StockDTO.array(),
  total: z.number(),
});

export type StockDTO = z.infer<typeof StockDTO>;
export type StockListDTO = z.infer<typeof StockListDTO>;
export type NewStockDTO = z.infer<typeof NewStockDTO>;
export type UpdateStockDTO = z.infer<typeof UpdateStockDTO>;
export type UserStockDTO = z.infer<typeof UserStockDTO>;
