import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiMinecraftModule } from '@automated-minecraft-bot/api/minecraft';

@Module({
  imports: [ApiMinecraftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
