import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { patchNestjsSwagger } from "@anatine/zod-nestjs";
import { Logger } from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle("Authentication module")
    .setDescription("Authentication module with 2FA")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  patchNestjsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    Logger.log("Listening at http://localhost:" + port + "/" + globalPrefix);
  });
}
void bootstrap();
