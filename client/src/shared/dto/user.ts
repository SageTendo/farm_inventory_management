import { z } from "zod";

export const UserDTO = z.object({
  id: z.string(),
  fullname: z.string(),
  username: z.string(),
  passwordHash: z.string(),
  roleID: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// This is the data that is returned from the service layer
export const UserResponseDTO = UserDTO.omit({ passwordHash: true });

// This is the data that is sent to the service layer
export const NewUserDTO = z.object({
  fullname: z.string(),
  username: z.string(),
  password: z.string(), // Plaintext, gets hashed in AuthService
  roleID: z.string(),
});

// This is the data that is sent to the repository layer
export const CreateUserDTO = NewUserDTO.omit({ password: true }).extend({
  passwordHash: z.string(),
});

// This is the data that is sent to the repository layer
export const UpdateUserDTO = UserDTO.omit({
  id: true,
  createdAt: true,
}).partial();

export type UserDTO = z.infer<typeof UserDTO>;
export type UserResponseDTO = z.infer<typeof UserResponseDTO>;
export type NewUserDTO = z.infer<typeof NewUserDTO>;
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>;
