import { z } from "zod";
import { publicProcedure, router } from ".";
import { AuthDataDTO, AuthResponseDTO } from "../dto/auth";
import { IAuthService } from "../../main/service/interfaces/IAuthService";
import { NewUserDTO, UserResponseDTO } from "../dto/user";

export const authRouter = (authService: IAuthService) =>
  router({
    login: publicProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .output(AuthResponseDTO)
      .query(({ input }) => authService.login(input.username, input.password)),

    register: publicProcedure
      .input(
        z.object({
          registeringUserId: z.string(),
          newUser: NewUserDTO,
        })
      )
      .output(AuthResponseDTO)
      .mutation(({ input }) =>
        authService.register(input.registeringUserId, input.newUser)
      ),

    updateRole: publicProcedure
      .input(
        z.object({
          adminId: z.string(),
          userId: z.string(),
          roleId: z.string(),
        })
      )
      .output(UserResponseDTO.nullable())
      .mutation(({ input }) =>
        authService.updateRole(input.adminId, input.userId, input.roleId)
      ),

    updatePassword: publicProcedure
      .input(
        z.object({
          adminId: z.string(),
          userId: z.string(),
          password: z.string(),
        })
      )
      .output(UserResponseDTO.nullable())
      .query(({ input }) =>
        authService.updatePassword(input.adminId, input.userId, input.password)
      ),

    generateSessionId: publicProcedure
      .input(AuthDataDTO.nonoptional())
      .output(z.string())
      .query(({ input }) => authService.signSession(input)),

    validateSessionId: publicProcedure
      .input(
        z.object({
          sessionToken: z.string(),
          authData: AuthDataDTO.nonoptional(),
        })
      )
      .output(z.boolean())
      .query(({ input }) =>
        authService.validateSession(input.sessionToken, input.authData)
      ),
  });
