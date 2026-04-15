import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { UserRepository } from './classes/user/user.repository';

@Module({
  providers: [EntitiesService, UserRepository],
  exports: [EntitiesService, UserRepository],
})
export class EntitiesModule {}
