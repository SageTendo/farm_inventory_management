import { userRoleTypes } from "../types";
import { z } from "zod";

export const RoleDTO = z.object({
  id: z.string(),
  type: z.enum(userRoleTypes),
});
export const NewRoleDTO = RoleDTO.omit({ id: true });

export type RoleDTO = z.infer<typeof RoleDTO>;
export type NewRoleDTO = z.infer<typeof NewRoleDTO>;
