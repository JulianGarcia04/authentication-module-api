import { ZodValidationPipe } from "@anatine/zod-nestjs";

import {
  Body,
  Controller,
  Post,
  UsePipes,
  Put,
  Param,
  Get,
  HttpException,
  HttpStatus,
  Delete,
  Query,
  HttpCode,
} from "@nestjs/common";

import { UserDto, UpdateUserDto, FindUsersDto, type User } from "./users.schema";

import { UsersService } from "./users.service";

import { UsersMapper } from "./users.mapper";

import { BcryptService } from "src/providers/bcrypt";

@Controller("users")
@UsePipes(ZodValidationPipe)
export class UsersController {
  public constructor(
    private readonly usersService: UsersService,

    private readonly usersMapper: UsersMapper,

    private readonly bcryptService: BcryptService,
  ) {}

  @Get("")
  public async find(@Query() query?: FindUsersDto): Promise<User[]> {
    const usersListProxy = await this.usersService.find(query);

    const usersList = usersListProxy
      .filter((user) => {
        return user.exists && this.usersMapper.isFine({ ...user.data, id: user.id });
      })
      .map((user) => {
        return this.usersMapper.parse({ ...user.data, id: user.id });
      })
      .filter((user) => {
        return !user.isDelete;
      });

    return usersList;
  }

  @Get(":id")
  public async findByID(@Param("id") userID: string): Promise<UserDto> {
    const data = await this.usersService.findById(userID);

    if (!data.exists) {
      throw new HttpException(`User with id ${userID} was not find`, HttpStatus.NOT_FOUND);
    }

    const user = await this.usersMapper.parseAsync({ ...data.data, id: data.id }).catch((err) => {
      console.error("Zod error: ", err);

      throw new HttpException(
        `User with id ${data.id} was find but the data is bad`,

        HttpStatus.NOT_ACCEPTABLE,
      );
    });

    if (user.isDelete) {
      throw new HttpException("User is deleted", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post("create")
  @HttpCode(202)
  public async create(@Body() body: UserDto): Promise<string> {
    const getUsers = await this.usersService.find(
      body.phone
        ? { email: body.email, phone: body.phone, isDelete: false }
        : { email: body.email, isDelete: false },
    );

    const users = getUsers
      .filter((user) => user.exists && this.usersMapper.isFine({ ...user.data, id: user.id }))
      .map((user) => {
        return this.usersMapper.parse({ ...user.data, id: user.id });
      })
      .filter((user) => {
        return !user.isDelete;
      });

    if (users.length >= 1) {
      throw new HttpException(
        "User ready exists. The email and phone must be unique",

        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptPassword = this.bcryptService.encrypt(body.password);

    const { id } = await this.usersService.create({ ...body, password: encryptPassword });

    return id;
  }

  @Put("update/:id")
  public async update(@Param("id") userID: string, @Body() body: UpdateUserDto): Promise<string> {
    await this.usersService.update(userID, body);

    return "User was update correctly";
  }

  @Delete("delete/:id")
  public async delete(@Param("id") userID: string): Promise<string> {
    await this.usersService.update(userID, { isDelete: true });

    return "User was delete correctly";
  }
}
