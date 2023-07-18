import { Controller, Get, Param, Headers, Ip, UseGuards, HttpException } from '@nestjs/common';
import { ApiMinecraftService } from './api-minecraft.service';
import { LocalGuard } from '@automated-minecraft-bot/api/localguard';
import { CsrfGuard, JwtGuard } from '@automated-minecraft-bot/api/guards';

@Controller('api-minecraft')
export class ApiMinecraftController {
  constructor(private apiMinecraftService: ApiMinecraftService) {}

  @Get('tryAuth')
  @UseGuards(LocalGuard)
  async tryAuth(@Headers() headers: any, @Ip() ip: any): Promise<any>{
    console.log(headers);
    if(headers.uuid === undefined || headers.ip === undefined || headers.hostname === undefined)
      throw new HttpException('Missing required headers', 400);
    if (await this.apiMinecraftService.authenticate(headers.uuid, headers.ip, headers.hostname))
      return true;
    else
      throw new HttpException('Authentication failed', 401);
  }

  @Get('activePlayers')
  @UseGuards(JwtGuard, CsrfGuard)
  async getActivePlayers(): Promise<Array<string>>{
    return await this.apiMinecraftService.getActiveClients();
  }

  @Get('removePlayer/:id')
  @UseGuards(JwtGuard, CsrfGuard)
  async removeExistingPlayer(@Param('id') id: string){
    return await this.apiMinecraftService.removeClient(id);
  }

  @Get('addPlayer/:id')
  @UseGuards(JwtGuard, CsrfGuard)
  async createNewPlayer(@Param('id') id: string){
    return await this.apiMinecraftService.createClient(id);
  }
}
