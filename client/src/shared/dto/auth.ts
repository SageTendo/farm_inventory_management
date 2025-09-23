import { userRoleTypes } from "../types";
import { z } from "zod";

export const AuthResponseDTO = z.object({
  success: z.boolean(),
  message: z.string(),
  authData: z
    .object({
      id: z.string(),
      username: z.string(),
      role: z.enum(userRoleTypes),
    })
    .optional(),
});

export type AuthResponseDTO = z.infer<typeof AuthResponseDTO>;