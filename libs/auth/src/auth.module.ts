import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt/jwt';

@Module({
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
