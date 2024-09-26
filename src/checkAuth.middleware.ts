import { HttpException, HttpStatus, Injectable, Inject, type NestMiddleware } from "@nestjs/common";
import type { Response, NextFunction } from "express";
import { JwtService } from "src/providers/jwt";
import { UsersService } from "src/app/users/users.service";
import { z } from "zod";
import { UsersMapper } from "src/app/users/users.mapper";
import type { User } from "./app/users/users.schema";

interface RequestProxy extends Request {
  user?: User;
}

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  public constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(UsersMapper) private readonly usersMapper: UsersMapper,
  ) {}

  public async use(req: RequestProxy, res: Response, next: NextFunction): Promise<void> {
    const headers = req.headers;

    const authorization: string = headers["authorization"];

    if (!authorization) {
      throw new HttpException("The authorization header is required", HttpStatus.UNAUTHORIZED);
    }

    const payload = await this.jwtService.verifyToken(authorization.split(" ")[1]).catch((err) => {
      throw new HttpException(
        `Error to parse token payload. Error: ${err}`,
        HttpStatus.UNAUTHORIZED,
      );
    });

    const checkPayload = z
      .object({
        id: z.string(),
      })
      .safeParse(payload);

    if (!checkPayload.success) {
      throw new HttpException(
        `Error to parse token payload. Error: ${checkPayload.error}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { id } = checkPayload.data;

    const user = await this.usersService.findById(id).catch((err) => {
      throw new HttpException(
        `Error to find the user by id saved in the token. Error: ${err}`,
        HttpStatus.UNAUTHORIZED,
      );
    });

    if (!user.exists) {
      throw new HttpException(`Current user no found.`, HttpStatus.NOT_FOUND);
    }

    const checkedUser = await this.usersMapper
      .parseAsync({ ...user.data, id: user.id })
      .catch((err) => {
        throw new HttpException(
          `Error to check the user structure. Error: ${err}`,
          HttpStatus.UNAUTHORIZED,
        );
      });

    if (checkedUser.isDelete) {
      throw new HttpException("User was deleted", HttpStatus.FORBIDDEN);
    }

    req.user = checkedUser;

    next();
  }
}
