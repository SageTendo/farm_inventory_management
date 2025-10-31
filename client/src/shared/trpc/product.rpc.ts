import { z } from "zod";
import { router, publicProcedure } from ".";
import { IProductService } from "../../main/service/interfaces/IProductService";
import { NewProductDTO, ProductDTO, ProductListDTO, UpdateProductDTO } from "../dto/product";

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
          .optional()
      )
      .output(ProductListDTO)
      .query(({ input }) =>
        productService.getAll(input?.searchTerm, input?.limit, input?.offset)
      ),

    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .output(ProductDTO.nullable())
      .query(({ input }) => productService.getById(input?.id)),

    create: publicProcedure
      .input(NewProductDTO)
      .output(ProductDTO)
      .mutation(({ input }) => productService.create(input)),

    update: publicProcedure
      .input(
        z.object({
          userId: z.string(),
          id: z.string(),
          entity: UpdateProductDTO,
        })
      )
      .output(ProductDTO.nullable())
      .mutation(({ input }) =>
        productService.update(input.userId, input.id, input.entity)
      ),

    delete: publicProcedure
      .input(
        z.object({
          userId: z.string(),
          id: z.string(),
        })
      )
      .mutation(({ input }) => productService.delete(input.userId, input.id)),
  });
