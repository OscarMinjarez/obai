import { Module } from '@nestjs/common';
import { ClientApiController } from './client-api.controller';
import { ClientApiService } from './client-api.service';
import { EntitiesModule } from 'obai/entities';
import { DevicesModule } from './devices/devices.module';
import { IntelligenceModule } from './intelligence/intelligence.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EntitiesModule, DevicesModule, IntelligenceModule, AuthModule],
  controllers: [ClientApiController],
  providers: [ClientApiService],
})
export class ClientApiModule {}
