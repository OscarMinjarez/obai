import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { Logger, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ClientApiModule } from './client-api.module';
import { AllExceptionsFilter } from 'obai/common';

const APP_NAME = 'ClientAPI';
const PORT = process.env.PORT ?? 8000;
async function bootstrap() {
  const app = await NestFactory.create(ClientApiModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT);
  Logger.log(`Running on http://localhost:${PORT}`, APP_NAME);
}
bootstrap();
