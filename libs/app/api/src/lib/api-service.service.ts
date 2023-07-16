import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private httpClient: HttpClient) {}
  async getActivePlayers(): Promise<string[]>{
    return firstValueFrom(this.httpClient.get<string[]>('/api/api-minecraft/activePlayers'));
  }
  async addPlayer(id: string): Promise<unknown>{
    return firstValueFrom(this.httpClient.get<unknown>(`/api/api-minecraft/addPlayer/${id}`));
  }
  async removePlayer(id: string): Promise<unknown>{
    return firstValueFrom(this.httpClient.get<unknown>(`/api/api-minecraft/removePlayer/${id}`));
  }
}
