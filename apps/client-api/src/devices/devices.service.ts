import { Injectable } from '@nestjs/common';
import { DeviceRepository } from 'obai/entities';
import { RegisterDeviceRequest } from './requests/register-device.request';
import { DeviceResponse } from './responses/device.response';

@Injectable()
export class DevicesService {

  constructor(private readonly deviceRepo: DeviceRepository) {}

  async registerDevice(id: string, data: RegisterDeviceRequest): Promise<DeviceResponse> {
    const existingDevices = await this.deviceRepo.findByUserId(id);
    const existing = existingDevices.find((d) => d.fcmToken === data.fcmToken);
    if (existing) {
      const updated = await this.deviceRepo.update(existing.id, {
        ...existing,
        ...data,
        lastSeen: new Date(),
      });
      return new DeviceResponse(updated);
    }
    const created = await this.deviceRepo.create({
      ...data,
      userId: id,
      isActive: true,
      lastSeen: new Date(),
    } as any);
    return new DeviceResponse(created);
  }

  async updateHeartbeat(deviceId: string): Promise<DeviceResponse> {
    const updated = await this.deviceRepo.updateLastSeen(deviceId);
    return new DeviceResponse(updated);
  }

}
