import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";
import { UserSchema } from "../users/users.schema";
import { extendApi } from "@anatine/zod-openapi";

export class AuthLoginByEmailDto extends createZodDto(
  extendApi(
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
    {
      title: "Login by email body",
      description:
        "This is the login by email. You can configure for use 2FA or not, and you choose if give password or only check if email exists",
    },
  ),
) {}

export class AuthLoginByEmailResponse extends createZodDto(
  extendApi(
    z.object({
      token: z.string(),
      authStatus: z.object({
        valid: z.boolean(),
        status: z.string().optional(),
      }),
    }),
    {
      title: "Login by email response",
      description: "Response",
    },
  ),
) {}

export class AuthLoginByVerifyCodeDto extends createZodDto(
  extendApi(
    z.object({
      token: z.string(),
      code: z.string(),
    }),
    {
      title: "Login by verify code (2FA) body",
      description: "This methods is used when you used the 2FA",
    },
  ),
) {}

export const AuthLoginByVerifyCodeDesencryptPayload = z.object({
  id: z.string(),
  phone: z.string(),
});

export class AuthLoginByVerifyCodeResponse extends createZodDto(
  extendApi(
    z.object({
      authToken: z.string(),
      user: UserSchema,
    }),
    {
      title: "Login by verify code (2FA) body",
      description: "This is the reponse",
    },
  ),
) {}
