import { z } from "zod";
import { publicProcedure, router } from ".";
import { IUserService } from "../../main/service/interfaces/IUserService";
import { UpdateUserDTO, UserResponseDTO } from "../dto/user";

export const userRouter = (userService: IUserService) =>
  router({
    getAll: publicProcedure
      .input(
        z
          .object({
            limit: z.number().min(1).max(100).optional(),
            offset: z.number().min(0).optional(),
          })
          .optional()
      )
      .output(UserResponseDTO.array())
      .query(({ input }) => userService.getAll(input?.limit, input?.offset)),

    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .output(UserResponseDTO.nullable())
      .query(({ input }) => userService.getById(input?.id)),

    getByUsername: publicProcedure
      .input(
        z.object({
          username: z.string(),
        })
      )
      .output(UserResponseDTO.nullable())
      .query(({ input }) => userService.getByUsername(input?.username)),

    update: publicProcedure
      .input(
        z.object({
          id: z.string(),
          entity: UpdateUserDTO,
        })
      )
      .output(UserResponseDTO.nullable())
      .mutation(({ input }) => userService.update(input.id, input.entity)),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(({ input }) => userService.delete(input.id)),
  });
