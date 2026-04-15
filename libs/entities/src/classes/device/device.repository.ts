import { Injectable } from '@nestjs/common';
import { EntitiesService } from '../../entities.service';
import { DeviceEntity } from './device.entity';
import { BaseRepository } from '../base.repository';

@Injectable()
export class DeviceRepository extends BaseRepository<DeviceEntity> {

  constructor(entitiesService: EntitiesService) {
    super(entitiesService, 'device');
  }

  async findByUserId(id: string) {
    return this.entityService.device.findMany({ where: { userId: id } });
  }

  async updateLastSeen(id: string) {
    return this.entityService.device.update({
      where: { id },
      data: { lastSeen: new Date() },
    });
  }

}
