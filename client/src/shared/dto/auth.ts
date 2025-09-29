import { userRoleTypes } from "../types";
import { z } from "zod";

export const AuthDataDTO = z.object({
  id: z.string(),
  username: z.string(),
  role: z.enum(userRoleTypes),
}).optional();

export const AuthResponseDTO = z.object({
  success: z.boolean(),
  message: z.string(),
  authToken: z.string().optional(),
  sessionToken: z.string().optional(),
  authData: AuthDataDTO,
});

export type AuthResponseDTO = z.infer<typeof AuthResponseDTO>;
export type AuthDataDTO = z.infer<typeof AuthDataDTO>;