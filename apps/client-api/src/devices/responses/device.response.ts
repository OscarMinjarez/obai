import { Expose, Transform } from 'class-transformer';
import { DeviceType } from 'obai/entities';

export class DeviceResponse {

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: DeviceType;

  @Expose()
  isActive: boolean;

  @Expose()
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  lastSeen: Date;

  constructor(partial: Partial<DeviceResponse>) {
    Object.assign(this, partial);
  }

}
