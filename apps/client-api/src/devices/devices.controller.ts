import { Body, Controller, Post, Param, Patch } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { RegisterDeviceRequest } from './requests/register-device.request';

@Controller('devices')
export class DevicesController {

  constructor(private readonly devicesService: DevicesService) {}

  @Post('register/:id')
  async register(@Param('id') id: string, @Body() body: RegisterDeviceRequest) {
    return this.devicesService.registerDevice(id, body);
  }

  @Patch(':id/heartbeat')
  async heartbeat(@Param('id') id: string) {
    return this.devicesService.updateHeartbeat(id);
  }

}
