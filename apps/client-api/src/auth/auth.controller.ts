import { Body, Controller, Post } from '@nestjs/common';
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
  async login(@Body() data: LoginRequest) {
    return this.authService.signInWithEmailAndPassword(data.email, data.password);
  }
}
