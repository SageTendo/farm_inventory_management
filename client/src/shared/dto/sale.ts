import { z } from "zod";

export const SaleDTO = z.object({
  id: z.string(),
  sellerID: z.string(),
  exchangeRateID: z.string(),
  usedLocalCurrency: z.boolean(),
  totalAmount: z.number(),
  amountPaid: z.number(),
  changeReceived: z.number(),
  createdAt: z.date(),
});
export const NewSaleDTO = SaleDTO.omit({ id: true, createdAt: true });

export const SaleItemDTO = z.object({
  id: z.string(),
  saleID: z.string(),
  productID: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  createdAt: z.date(),
});
export const NewSaleItemDTO = SaleItemDTO.omit({ id: true, createdAt: true });

export type SaleDTO = z.infer<typeof SaleDTO>;
export type NewSaleDTO = z.infer<typeof NewSaleDTO>;
export type SaleItemDTO = z.infer<typeof SaleItemDTO>;
export type NewSaleItemDTO = z.infer<typeof NewSaleItemDTO>;
