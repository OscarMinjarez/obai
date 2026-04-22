import { Module } from '@nestjs/common';
import { AuthService, AuthModule as SharedAuthModule } from 'obai/auth';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'obai/auth/strategies/jwt/jwt';

@Module({
  imports: [SharedAuthModule],
  controllers: [AuthController],
})
export class AuthModule {}
