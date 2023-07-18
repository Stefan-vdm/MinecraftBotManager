import { Module } from '@nestjs/common';
import { ApiMinecraftController } from './api-minecraft.controller';
import { ApiMinecraftService } from './api-minecraft.service';
import { ApiLocalguardModule } from '@automated-minecraft-bot/api/localguard';

@Module({
  imports: [ApiLocalguardModule],
  controllers: [ApiMinecraftController],
  providers: [ApiMinecraftService],
  exports: [ApiMinecraftService],
})
export class ApiMinecraftModule {}
