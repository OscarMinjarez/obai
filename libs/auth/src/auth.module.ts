import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EntitiesModule } from '../../entities/src/entities.module';
import { ObaiI18nModule } from 'obai/i18n';
import { JwtStrategy } from './strategies/jwt/jwt';

@Module({
  imports: [EntitiesModule, ObaiI18nModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
