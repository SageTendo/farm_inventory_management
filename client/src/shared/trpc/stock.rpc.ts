import { z } from "zod";
import { router, publicProcedure, handleError } from ".";
import { IStockService } from "../../main/service/interfaces/IStockService";
import { StockDTO, UpdateStockDTO } from "../dto/stock";

export const stockRouter = (stockService: IStockService) =>
  router({
    getByProductId: publicProcedure
      .input(z.object({ productId: z.string() }))
      .output(StockDTO.nullable())
      .query(async ({ input }) => {
        try {
          return await stockService.getByProductId(input.productId);
        } catch (err) {
          handleError(err);
        }
      }),

    setQuantity: publicProcedure
      .input(
        z.object({
          userId: z.string(),
          stockId: z.string(),
          entity: UpdateStockDTO,
        }),
      )
      .output(StockDTO.nullable())
      .mutation(async ({ input }) => {
        try {
          return await stockService.setQuantity(
            input.userId,
            input.stockId,
            input.entity,
          );
        } catch (err) {
          handleError(err);
        }
      }),

    setThreshold: publicProcedure
      .input(
        z.object({
          userId: z.string(),
          stockId: z.string(),
          entity: UpdateStockDTO,
        }),
      )
      .output(StockDTO.nullable())
      .mutation(async ({ input }) => {
        try {
          return await stockService.setThreshold(
            input.userId,
            input.stockId,
            input.entity,
          );
        } catch (err) {
          handleError(err);
        }
      }),
  });
