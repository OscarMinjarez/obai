import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ClientApiModule } from './client-api.module';

const APP_NAME = 'ClientAPI';
const PORT = process.env.PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(ClientApiModule);
  // Enforce DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // Enable automatic Response transformation
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT);
  Logger.log(`Running on http://localhost:${PORT}`, APP_NAME);
}
bootstrap();
