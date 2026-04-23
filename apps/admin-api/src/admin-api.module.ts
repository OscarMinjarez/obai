import { Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller';
import { AdminApiService } from './admin-api.service';
import { UsersModule } from './users/users.module';
import { EntitiesModule } from 'obai/entities';
import { ObaiI18nModule } from 'obai/i18n';

@Module({
  imports: [UsersModule, EntitiesModule, ObaiI18nModule],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
