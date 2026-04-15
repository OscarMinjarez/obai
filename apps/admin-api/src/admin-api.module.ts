import { Module } from '@nestjs/common';
import { AdminApiController } from './admin-api.controller';
import { AdminApiService } from './admin-api.service';
import { UsersModule } from './users/users.module';
import { EntitiesModule } from 'obai/entities';

@Module({
  imports: [UsersModule, EntitiesModule],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
