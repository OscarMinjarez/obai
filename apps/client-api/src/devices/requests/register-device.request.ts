import { IsOptional, IsString, IsEnum } from 'class-validator';
import { DeviceType } from 'obai/entities';

export class RegisterDeviceRequest {

    @IsOptional()
    @IsString()
    name?: string;

    @IsEnum(DeviceType)
    type: DeviceType;

    @IsOptional()
    @IsString()
    fcmToken?: string;
}
