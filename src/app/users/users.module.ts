import { Global, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DbModule } from "src/db/db.module";
import { UsersMapper } from "./users.mapper";
import { BcryptService } from "src/providers/bcrypt";

@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersMapper, BcryptService],
  imports: [DbModule],
  exports: [UsersService, UsersMapper],
})
export class UsersModule {}
