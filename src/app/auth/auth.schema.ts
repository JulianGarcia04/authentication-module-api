import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";
import { UserSchema } from "../users/users.schema";

export class AuthLoginByEmailDto extends createZodDto(
  z.discriminatedUnion("with2FA", [
    z.object({
      email: z.string().email(),
      with2FA: z.literal(false),
      password: z.string(),
    }),
    z.object({
      email: z.string().email(),
      with2FA: z.literal(true),
      password: z.string().optional(),
    }),
  ]),
) {}

export class AuthLoginByEmailResponse extends createZodDto(
  z.object({
    token: z.string(),
    authStatus: z.object({
      valid: z.boolean(),
      status: z.string().optional(),
    }),
  }),
) {}

export class AuthLoginByVerifyCodeDto extends createZodDto(
  z.object({
    token: z.string(),
    code: z.string(),
  }),
) {}

export const AuthLoginByVerifyCodeDesencryptPayload = z.object({
  id: z.string(),
  phone: z.string(),
});

export class AuthLoginByVerifyCodeResponse extends createZodDto(
  z.object({
    authToken: z.string(),
    user: UserSchema,
  }),
) {}
