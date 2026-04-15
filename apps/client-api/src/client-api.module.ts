import { Module } from '@nestjs/common';
import { ClientApiController } from './client-api.controller';
import { ClientApiService } from './client-api.service';
import { EntitiesModule } from 'obai/entities';

@Module({
  imports: [EntitiesModule],
  controllers: [ClientApiController],
  providers: [ClientApiService],
})
export class ClientApiModule {}
