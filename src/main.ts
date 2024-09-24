import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import type { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
