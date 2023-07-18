import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiMinecraftModule } from '@automated-minecraft-bot/api/minecraft';
import { ApiAuthModule } from '@automated-minecraft-bot/api/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ApiMinecraftModule, ApiAuthModule, JwtModule.register(
    {
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1d' },
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
