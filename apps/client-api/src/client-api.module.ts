import { Module } from '@nestjs/common';
import { ClientApiController } from './client-api.controller';
import { ClientApiService } from './client-api.service';
import { EntitiesModule } from 'obai/entities';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [EntitiesModule, DevicesModule],
  controllers: [ClientApiController],
  providers: [ClientApiService],
})
export class ClientApiModule {}
