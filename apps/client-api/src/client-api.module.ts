import { Module } from '@nestjs/common';
import { ClientApiController } from './client-api.controller';
import { ClientApiService } from './client-api.service';
import { EntitiesModule } from 'obai/entities';
import { ObaiI18nModule } from 'obai/i18n';
import { DevicesModule } from './devices/devices.module';
import { IntelligenceModule } from './intelligence/intelligence.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [
    ObaiI18nModule,
    EntitiesModule, 
    DevicesModule, 
    IntelligenceModule, 
    AuthModule, 
    ChatModule, 
    AgentsModule
  ],
  controllers: [ClientApiController],
  providers: [ClientApiService],
})
export class ClientApiModule {}
