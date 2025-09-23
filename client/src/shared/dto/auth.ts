import { roleTypes } from "../../main/database/schema/constants";
import { z } from "zod";

export const AuthResponseDTO = z.object({
  success: z.boolean(),
  message: z.string(),
  authData: z
    .object({
      id: z.string(),
      username: z.string(),
      role: z.enum(roleTypes),
    })
    .optional(),
});

export type AuthResponseDTO = z.infer<typeof AuthResponseDTO>;