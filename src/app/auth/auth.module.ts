import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { BcryptService } from "src/providers/bcrypt";
import { TwilioService } from "src/providers/twilio";
import { JwtService } from "src/providers/jwt";

@Module({
  providers: [BcryptService, TwilioService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
