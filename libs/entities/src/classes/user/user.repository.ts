import { Injectable } from '@nestjs/common';
import { EntitiesService } from '../../entities.service';
import { UserEntity } from './user.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {

  constructor(entitiesService: EntitiesService) {
    super(entitiesService, 'user');
  }

  async findByEmail(email: string) {
    return this.entityService.user.findUnique({ where: { email } });
  }

}
