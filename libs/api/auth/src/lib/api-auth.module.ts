import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleOAuthGuard } from '../google-oauth-guard.guard';

@Module({
  imports:[
    PassportModule.register({
      defaultStrategy: 'google' 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GoogleOAuthGuard],
  exports: [],
})
export class ApiAuthModule {}
