import { Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller.js';
import { AdminApiService } from './admin-api.service.js';
import { UsersModule } from './users/users.module.js';
import { EntitiesModule } from 'obai/entities';
import { ObaiI18nModule } from 'obai/i18n';

@Module({
  imports: [UsersModule, EntitiesModule, ObaiI18nModule],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
