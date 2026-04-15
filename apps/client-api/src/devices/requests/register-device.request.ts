import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class RegisterDeviceRequest {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['MOBILE', 'PC', 'TABLET', 'IOT'], {
    message: 'type must be one of the following values: MOBILE, PC, TABLET, IOT'
  })
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  fcmToken?: string;

}
