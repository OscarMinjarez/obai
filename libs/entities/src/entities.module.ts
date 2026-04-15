import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { UserRepository } from './classes/user/user.repository';
import { DeviceRepository } from './classes/device/device.repository';

@Module({
  providers: [EntitiesService, UserRepository, DeviceRepository],
  exports: [EntitiesService, UserRepository, DeviceRepository],
})
export class EntitiesModule {}
