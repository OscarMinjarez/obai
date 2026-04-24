import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AdminApiModule } from './admin-api.module.js';
import { AllExceptionsFilter } from 'obai/common';

const APP_NAME = 'AdminAPI';
const PORT = process.env.PORT ?? 8001;
async function bootstrap() {
  const app = await NestFactory.create(AdminApiModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
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
