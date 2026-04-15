import {
  IsString,
  IsUUID,
  IsEnum,
  IsBoolean,
  IsDate,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { DeviceType } from '../../../../../generated/prisma';

export { DeviceType };
export class DeviceEntity {

  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsEnum(DeviceType)
  @IsNotEmpty()
  type: DeviceType;

  @IsOptional()
  @IsString()
  fcmToken: string | null;

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
