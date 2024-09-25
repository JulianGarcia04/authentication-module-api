import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ZodValidationPipe } from "@anatine/zod-nestjs";
import {
  AuthLoginByEmailDto,
  AuthLoginByVerifyCodeDto,
  type AuthLoginByEmailResponse,
  AuthLoginByVerifyCodeDesencryptPayload,
  type AuthLoginByVerifyCodeResponse,
} from "./auth.schema";
import { BcryptService } from "src/providers/bcrypt";
import { UsersMapper } from "../users/users.mapper";
import { TwilioService } from "src/providers/twilio";
import { JwtService } from "src/providers/jwt";

@Controller("auth")
@UsePipes(ZodValidationPipe)
export class AuthController {
  public constructor(
    private readonly usersService: UsersService,
    private readonly usersMapper: UsersMapper,
    private readonly bcryptService: BcryptService,
    private readonly twilioService: TwilioService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("login")
  @HttpCode(202)
  public async loginByEmail(@Body() body: AuthLoginByEmailDto): Promise<AuthLoginByEmailResponse> {
    const { email, with2FA, password } = body;

    const checkUser = await this.usersService.find({ email });

    if (checkUser.length !== 1) {
      throw new HttpException("User not found by email", HttpStatus.NOT_FOUND);
    }

    console.log(checkUser);

    const currUserData = checkUser[0];

    const user = await this.usersMapper
      .parseAsync({ ...currUserData.data, id: currUserData.id })
      .catch((err) => {
        console.error("Zod error: ", err);
        throw new HttpException(
          `User with id ${checkUser[0].id} was find but the data is bad`,
          HttpStatus.NOT_ACCEPTABLE,
        );
      });

    const isCorrectPassword = password ? this.bcryptService.compare(password, user.password) : true;

    const generate2FA =
      with2FA && isCorrectPassword && user.phone
        ? await this.twilioService.sendVerifyToken(user.phone)
        : undefined;

    const authStatus = generate2FA
      ? { valid: generate2FA.valid, status: generate2FA.status }
      : { valid: true };

    const token = this.jwtService.generateToken(
      {
        phone: user.phone,
        id: user.id,
      },
      {
        expiresIn: 60 * 5,
      },
    );

    return {
      authStatus,
      token,
    };
  }

  @Post("login/verify")
  @HttpCode(202)
  public async loginByVerifyCode(
    @Body() body: AuthLoginByVerifyCodeDto,
  ): Promise<AuthLoginByVerifyCodeResponse> {
    const { code, token } = body;

    const payload = await this.jwtService.verifyToken(token).catch(() => {
      throw new HttpException("Token exprired", HttpStatus.UNAUTHORIZED);
    });

    const checkPayload = AuthLoginByVerifyCodeDesencryptPayload.safeParse(payload);

    if (!checkPayload.success) {
      throw new HttpException(
        `Error to verify payload token schema. Error: ${checkPayload.error}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const { phone, id } = checkPayload.data;

    const { status, valid } = await this.twilioService.verifyCodeSent(phone, code);

    if (status === "pending" && !valid) {
      throw new HttpException("Invalid verification code", HttpStatus.UNAUTHORIZED);
    }

    const rawUser = await this.usersService.findById(id).catch((err) => {
      throw new HttpException(`User not found by email. Error: ${err}`, HttpStatus.NOT_FOUND);
    });

    const user = await this.usersMapper
      .parseAsync({ ...rawUser.data, id: rawUser.id })
      .catch((err) => {
        throw new HttpException(
          `Error to parse the user. Error: ${err}`,
          HttpStatus.NOT_ACCEPTABLE,
        );
      });

    const authToken = this.jwtService.generateToken(
      {
        id,
      },
      {
        expiresIn: 60 * 60,
      },
    );

    console.log(user);

    return {
      authToken,
      user,
    };
  }
}
