import { Injectable } from '@nestjs/common';
import { DeviceRepository } from 'obai/entities';
import { DeviceResponse } from '../devices/responses/device.response';

@Injectable()
export class IntelligenceService {

  constructor(private readonly deviceRepo: DeviceRepository) {}

  async getTargetDevice(userId: string): Promise<DeviceResponse | null> {
    const activeDevice = await this.deviceRepo.findMostRecentByUserId(userId);
    if (!activeDevice) {
      return null;
    }
    return new DeviceResponse(activeDevice);
  }

  async analyzeContextAndNotify(userId: string, context: string): Promise<void> {
    const target = await this.getTargetDevice(userId);
    if (target) {
      // TODO: Integration with FCM or Socket.io will go here
      console.log(`[Obai Intelligence] Target device found: ${target.name} (${target.type})`);
      console.log(`[Obai Intelligence] Sending spontaneous message: ${context}`);
    }
  }

}
