import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}
  async getActivePlayers(): Promise<string[]>{
    return firstValueFrom(this.httpClient.get<string[]>('/api/api-minecraft/activePlayers', {
      headers: {
        'x-csrf-token': this.cookieService.get('csrf'),
      }
    }));
  }
  async addPlayer(id: string): Promise<unknown>{
    return firstValueFrom(this.httpClient.get<unknown>(`/api/api-minecraft/addPlayer/${id}`, {
      headers: {
        'x-csrf-token': this.cookieService.get('csrf'),
      }
    }));
  }
  async removePlayer(id: string): Promise<unknown>{
    return firstValueFrom(this.httpClient.get<unknown>(`/api/api-minecraft/removePlayer/${id}`, {
      headers: {
        'x-csrf-token': this.cookieService.get('csrf'),
      }
    }));
  }
}
