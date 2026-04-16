import { Injectable } from '@nestjs/common';
import { DeviceRepository } from 'obai/entities';
import { DeviceResponse } from './responses/device.response';
import { RegisterDeviceRequest } from './requests/register-device.request';

@Injectable()
export class DevicesService {

  constructor(private readonly deviceRepo: DeviceRepository) {}

  async registerDevice(userId: string, data: RegisterDeviceRequest): Promise<DeviceResponse> {
    const existingDevices = await this.deviceRepo.findByUserId(userId);
    const existing = existingDevices.find((d) => d.fcmToken === data.fcmToken);

    if (existing) {
      const updated = await this.deviceRepo.update(existing.id, {
        ...existing,
        ...data,
        lastSeen: new Date(),
      } as any);
      return new DeviceResponse(updated as any);
    }

    const created = await this.deviceRepo.create({
      ...data,
      userId,
      isActive: true,
      lastSeen: new Date(),
    } as any);
    return new DeviceResponse(created as any);
  }

  async updateHeartbeat(deviceId: string): Promise<DeviceResponse> {
    const updated = await this.deviceRepo.updateLastSeen(deviceId);
    return new DeviceResponse(updated as any);
  }

}
