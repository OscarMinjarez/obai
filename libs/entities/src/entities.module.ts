import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { UserRepository } from './classes/user/user.repository';
import { DeviceRepository } from './classes/device/device.repository';
import { AgentRepository } from './classes/agent/agent.repository';

@Module({
  providers: [EntitiesService, UserRepository, DeviceRepository, AgentRepository],
  exports: [EntitiesService, UserRepository, DeviceRepository, AgentRepository],
})
export class EntitiesModule {}
