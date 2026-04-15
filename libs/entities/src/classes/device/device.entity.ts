import { IsString, IsUUID, IsEnum, IsBoolean, IsDate, IsOptional } from 'class-validator';

export enum DeviceType {
  MOBILE = 'MOBILE',
  PC = 'PC',
  TABLET = 'TABLET',
  IOT = 'IOT',
}
export class DeviceEntity {

  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(DeviceType)
  type: DeviceType;

  @IsString()
  @IsOptional()
  fcmToken?: string;

  @IsBoolean()
  isActive: boolean;

  @IsDate()
  lastSeen: Date;

  @IsUUID()
  userId: string;

  constructor(partial: Partial<DeviceEntity>) {
    Object.assign(this, partial);
  }

}
