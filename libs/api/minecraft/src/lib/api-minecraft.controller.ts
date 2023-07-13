import { Controller, Get, Param } from '@nestjs/common';
import { ApiMinecraftService } from './api-minecraft.service';

@Controller('api-minecraft')
export class ApiMinecraftController {
  constructor(private apiMinecraftService: ApiMinecraftService) {}

  @Get('activePlayers')
  async getActivePlayers(): Promise<Array<string>>{
    return await this.apiMinecraftService.getActiveClients();
  }

  @Get('removePlayer/:id')
  async removeExistingPlayer(@Param('id') id: string){
    return await this.apiMinecraftService.removeClient(id);
  }

  @Get('addPlayer/:id')
  async createNewPlayer(@Param('id') id: string){
    return await this.apiMinecraftService.createClient(id);
  }
}
