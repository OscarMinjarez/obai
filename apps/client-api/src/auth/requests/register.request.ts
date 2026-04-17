import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterRequest {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

}
