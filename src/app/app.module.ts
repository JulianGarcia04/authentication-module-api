import { Module, type NestModule, type MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { HttpExceptionFilter } from "../HttpErrorFilter";
import { APP_FILTER } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { EnvSchema } from "src/env";
import { CheckAuthMiddleware } from "src/checkAuth.middleware";
import { JwtService } from "src/providers/jwt";
import { FavoritesModule } from "./favorites/favorites.module";

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
    FavoritesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtService,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CheckAuthMiddleware).forRoutes("favorites", {
      path: "users/*",
      method: RequestMethod.GET,
    });
  }
}
