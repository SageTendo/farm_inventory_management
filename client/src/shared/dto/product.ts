import { z } from "zod";
import { Money } from "../lib/money";

export const ProductDTO = z.object({
  id: z.string(),
  name: z.string(),
  buyPrice: z.number(),
  sellPrice: z.number(),
  isDeleted: z.boolean(),
  createdAt: z.coerce.date(),
  addedBy: z.string(),
  quantity: z.number().optional(),
  lowStockThreshold: z.number().optional(),
});

export const NewProductDTO = ProductDTO.omit({
  id: true,
  isDeleted: true,
  createdAt: true,
});

export const UpdateProductDTO = ProductDTO.omit({
  id: true,
  addedBy: true,
  createdAt: true,
  isDeleted: true,
}).partial();

export const ProductListDTO = z.object({
  products: ProductDTO.array(),
  total: z.number(),
});

export const CartItemDTO = ProductDTO.transform((data) => ({
  ...data,
  buyPrice: Money.fromDollars(data.buyPrice),
  sellPrice: Money.fromDollars(data.sellPrice),
}));

export type ProductDTO = z.infer<typeof ProductDTO>;
export type NewProductDTO = z.infer<typeof NewProductDTO>;
export type UpdateProductDTO = z.infer<typeof UpdateProductDTO>;
export type ProductListDTO = z.infer<typeof ProductListDTO>;
export type CartItemDTO = z.infer<typeof CartItemDTO>;
