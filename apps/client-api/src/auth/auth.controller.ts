import { Body, Controller, Ip, Post } from '@nestjs/common';
import { AuthService } from 'obai/auth';
import { RegisterRequest } from './requests/register.request';
import { LoginRequest } from './requests/login.request';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterRequest) {
    return this.authService.signUpWithEmailAndPassword(data.email, data.password, data.name);
  }

  @Post('login')
  async login(@Body() data: LoginRequest, @Ip() ip: string) {
    return this.authService.signInWithEmailAndPassword(
      data.email, 
      data.password, 
      data.deviceType, 
      data.userAgent,
      ip
    );
  }

  @Post('logout')
  async logout(@Body() data: { refreshToken: string }) {
    return this.authService.logout(data.refreshToken);
  }
}
