import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email(),
  birthdate: z.date().optional(),
  password: z.string(),
  createAt: z.date().default(new Date()),
  isDelete: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;

export class UserDto extends createZodDto(UserSchema.omit({ id: true })) {}

export class UpdateUserDto extends createZodDto(
  UserSchema.omit({ email: true, createAt: true, id: true }).partial(),
) {}

export class FindUsersDto extends createZodDto(UserSchema.omit({ id: true }).partial()) {}
