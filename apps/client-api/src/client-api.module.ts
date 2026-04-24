import { Module } from '@nestjs/common';
import { ClientApiController } from './client-api.controller.js';
import { ClientApiService } from './client-api.service.js';
import { EntitiesModule } from 'obai/entities';
import { ObaiI18nModule } from 'obai/i18n';
import { DevicesModule } from './devices/devices.module.js';
import { IntelligenceModule } from './intelligence/intelligence.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ChatModule } from './chat/chat.module.js';
import { AgentsModule } from './agents/agents.module.js';

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
