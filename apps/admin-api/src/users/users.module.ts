import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EntitiesModule } from 'obai/entities';

@Module({
  imports: [EntitiesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
