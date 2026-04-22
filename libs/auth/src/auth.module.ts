import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EntitiesModule } from '../../entities/src/entities.module';
import { JwtStrategy } from './strategies/jwt/jwt';

@Module({
  imports: [EntitiesModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
