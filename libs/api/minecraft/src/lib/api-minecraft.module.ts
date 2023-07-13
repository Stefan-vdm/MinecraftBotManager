import { Module } from '@nestjs/common';
import { ApiMinecraftController } from './api-minecraft.controller';
import { ApiMinecraftService } from './api-minecraft.service';

@Module({
  controllers: [ApiMinecraftController],
  providers: [ApiMinecraftService],
  exports: [ApiMinecraftService],
})
export class ApiMinecraftModule {}
