import { createZodDto } from "@anatine/zod-nestjs";
import { extendApi } from "@anatine/zod-openapi";
import { Timestamp } from "@google-cloud/firestore";
import { z } from "zod";

export const UserSchema = extendApi(
  z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string().optional(),
    email: z.string().email(),
    birthdate: z.date().optional(),
    password: z.string(),
    favorite_movies: z.array(z.number()).optional(),
    createAt: z
      .union([z.date().default(new Date()), z.instanceof(Timestamp)])
      .transform((val) => {
        if (val instanceof Timestamp) {
          return val.toDate();
        }
        return val;
      })
      .pipe(z.date()),
    isDelete: z.boolean().default(false),
  }),
  {
    title: "User",
    description: "Is a User",
  },
);

export type User = z.infer<typeof UserSchema>;

export class UserDto extends createZodDto(UserSchema.omit({ id: true })) {}

export class UpdateUserDto extends createZodDto(
  UserSchema.omit({ email: true, createAt: true, id: true }).partial(),
) {}

export class FindUsersDto extends createZodDto(
  UserSchema.omit({ id: true })
    .merge(
      z.object({
        isDelete: z.preprocess((val) => {
          if (typeof val !== "string") {
            return;
          }

          if (!val || val === "false") {
            return false;
          }

          return true;
        }, z.boolean()),
      }),
    )
    .partial(),
) {}
