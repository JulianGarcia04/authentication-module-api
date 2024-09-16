import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { HttpExceptionFilter } from "../HttpErrorFilter";
import { APP_FILTER } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { EnvSchema } from "src/env";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validate(config) {
        return EnvSchema.parse(config);
      },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
