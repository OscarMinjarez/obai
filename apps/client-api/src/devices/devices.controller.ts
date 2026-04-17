import { Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { RegisterDeviceRequest } from './requests/register-device.request';
import { JwtAuthGuard } from 'obai/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {

  constructor(private readonly devicesService: DevicesService) {}

  @Post('register')
  async register(@Req() req: any, @Body() data: RegisterDeviceRequest) {
    const userId = req.user.id;
    return this.devicesService.registerDevice(userId, data);
  }

  @Patch(':id/heartbeat')
  async updateHeartbeat(@Req() _req: any, @Param('id') deviceId: string) {
    // Note: We keep deviceId in URL because it's specific to the hardware, 
    // but the Guard ensures the caller is authenticated.
    return this.devicesService.updateHeartbeat(deviceId);
  }

}
