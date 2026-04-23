import { IsEmail, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginRequest {

  @IsEmail({}, { message: i18nValidationMessage('validation.IS_EMAIL') })
  email: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  @MinLength(6, { message: i18nValidationMessage('validation.MIN_LENGTH') })
  password: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  deviceType?: string;

  @IsString({ message: i18nValidationMessage('validation.IS_STRING') })
  userAgent?: string;

}
