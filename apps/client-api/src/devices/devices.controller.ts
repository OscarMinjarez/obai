import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { RegisterDeviceRequest } from './requests/register-device.request';

@Controller('devices')
export class DevicesController {

  constructor(private readonly devicesService: DevicesService) {}

  @Post('register/:id')
  async register(@Param('id') userId: string, @Body() data: RegisterDeviceRequest) {
    return this.devicesService.registerDevice(userId, data);
  }

  @Patch(':id/heartbeat')
  async updateHeartbeat(@Param('id') deviceId: string) {
    return this.devicesService.updateHeartbeat(deviceId);
  }

}
