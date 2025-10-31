import { z } from "zod";

export const ProductDTO = z.object({
  id: z.string(),
  name: z.string(),
  buyPrice: z.number(),
  sellPrice: z.number(),
  addedBy: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  quantity: z.number(),
  lowStockThreshold: z.number(),
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

export type ProductDTO = z.infer<typeof ProductDTO>;
export type NewProductDTO = z.infer<typeof NewProductDTO>;
export type UpdateProductDTO = z.infer<typeof UpdateProductDTO>;
export type ProductListDTO = z.infer<typeof ProductListDTO>;
