import { Injectable } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import { type JwtPayload, sign, verify } from "jsonwebtoken";

@Injectable()
export class JwtService {
  public constructor(private readonly configService: ConfigService) {}

  public generateToken(
    payload: object,

    opt: {
      expiresIn: string | number;
    },
  ): string {
    const secret = this.configService.get<string>("JWT_SECRET");

    if (!secret) {
      throw new Error("Secret does not exists");
    }

    return sign(payload, secret, opt);
  }

  public verifyToken(token: string): Promise<string | JwtPayload> {
    return new Promise((res, rej) => {
      const secret = this.configService.get<string>("JWT_SECRET");

      if (!secret) {
        rej("Secret does not exists");
        return;
      }

      res(verify(token, secret));
    });
  }
}
