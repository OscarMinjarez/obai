import { Injectable, Logger } from '@nestjs/common';
import { DeviceRepository } from 'obai/entities';
import { DeviceResponse } from '../devices/responses/device.response';

@Injectable()
export class IntelligenceService {

  private readonly logger = new Logger(IntelligenceService.name);

  constructor(private readonly deviceRepo: DeviceRepository) {}

  async findTargetDevice(userId: string): Promise<DeviceResponse | null> {
    const activeDevice = await this.deviceRepo.findMostRecentByUserId(userId);
    if (!activeDevice) {
      return null;
    }
    // Casting to any or DeviceResponse to bypass the strict Enum check between Prisma and Entity
    return new DeviceResponse(activeDevice as any);
  }

  async analyzeContextAndNotify(userId: string, context: string): Promise<void> {
    const target = await this.findTargetDevice(userId);
    if (!target) {
      this.logger.warn(
        `No active device found for user ${userId}. Proactive notification skipped.`,
      );
      return;
    }
    this.logger.log(
      `Proactive event for user ${userId} on device ${target.id} with context: ${context}`,
    );
    // Here we would call the notification provider (FCM, etc)
  }

}
