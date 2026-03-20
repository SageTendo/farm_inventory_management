import { z } from "zod";
import { router, publicProcedure, handleError } from ".";
import { IProductService } from "../../main/service/interfaces/IProductService";
import {
  NewProductDTO,
  ProductDTO,
  ProductListDTO,
  UpdateProductDTO,
} from "../dto/product";

export const productRouter = (productService: IProductService) =>
  router({
    getAll: publicProcedure
      .input(
        z
          .object({
            searchTerm: z.string().optional(),
            limit: z.number().min(1).max(100).optional(),
            offset: z.number().min(0).optional(),
          })
          .optional(),
      )
      .output(ProductListDTO)
      .query(async ({ input }) => {
        try {
          return await productService.getAll(
            input?.searchTerm,
            input?.limit,
            input?.offset,
          );
        } catch (err) {
          handleError(err);
        }
      }),

    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .output(ProductDTO.nullable())
      .query(async ({ input }) => {
        try {
          return await productService.getById(input?.id);
        } catch (err) {
          handleError(err);
        }
      }),

    create: publicProcedure
      .input(NewProductDTO)
      .output(ProductDTO)
      .mutation(async ({ input }) => {
        try {
          return await productService.create(input);
        } catch (err) {
          handleError(err);
        }
      }),

    update: publicProcedure
      .input(
        z.object({
          userId: z.string(),
          id: z.string(),
          entity: UpdateProductDTO,
        }),
      )
      .output(ProductDTO.nullable())
      .mutation(async ({ input }) => {
        try {
          return await productService.update(
            input.userId,
            input.id,
            input.entity,
          );
        } catch (err) {
          handleError(err);
        }
      }),

    delete: publicProcedure
      .input(
        z.object({
          userId: z.string(),
          id: z.string(),
        }),
      )
      .output(z.object({ success: z.boolean() }))
      .mutation(async ({ input }) => {
        try {
          await productService.delete(input.userId, input.id);
          return { success: true } as const;
        } catch (err) {
          handleError(err);
        }
      }),
  });
