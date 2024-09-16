import { Injectable } from "@nestjs/common";
import { type User, UserSchema } from "./users.schema";

@Injectable()
export class UsersMapper {
  public async parseAsync(val: unknown): Promise<User> {
    return UserSchema.parseAsync(val);
  }

  public parse(val: unknown): User {
    return UserSchema.parse(val);
  }

  public isFine(val: unknown): boolean {
    return UserSchema.safeParse(val).success;
  }
}
