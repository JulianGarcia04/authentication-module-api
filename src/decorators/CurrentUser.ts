import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { User } from "../app/users/users.schema";

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as unknown as User; // extract token from request
});
