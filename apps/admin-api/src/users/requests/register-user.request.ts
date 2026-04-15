import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export default class RegisterUserRequest {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  constructor(partial: Partial<RegisterUserRequest>) {
    Object.assign(this, partial);
  }

}
