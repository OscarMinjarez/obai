import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AdminApiModule } from './admin-api.module';

const APP_NAME = 'AdminAPI';
const PORT = process.env.PORT ?? 3001;
async function bootstrap() {
  const app = await NestFactory.create(AdminApiModule);
  app.setGlobalPrefix('api');
  // Enforce DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // Enable automatic Response transformation (hiding passwords, etc)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT);
  Logger.log(`Running on http://localhost:${PORT}`, APP_NAME);
}
bootstrap();
