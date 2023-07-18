import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { GoogleOAuthGuard } from '../google-oauth-guard.guard';
import { ApiMinecraftModule } from '@automated-minecraft-bot/api/minecraft';

@Module({
  imports:[
    PassportModule.register({
      defaultStrategy: 'google' 
    }),
    ApiMinecraftModule
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GoogleOAuthGuard],
  exports: [],
})
export class ApiAuthModule {}
