import { Component } from '@angular/core';
import { ApiServiceService } from '@automated-minecraft-bot/app/api';

@Component({
  selector: 'automated-minecraft-bot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  players: string[];
  public playerID: string;
  constructor(private apiService: ApiServiceService){
    this.players = [];
    this.playerID = '';
  }
  // on ng init
  async ngOnInit(): Promise<void> {
    this.players = await this.apiService.getActivePlayers();
  }

  async removePlayer(id: string): Promise<void>{
    this.apiService.removePlayer(id).then(async () => {
      this.players = await this.apiService.getActivePlayers();
    });
  }

  async addPlayer(): Promise<void>{
    this.apiService.addPlayer(this.playerID).then(async () => {
      this.players = await this.apiService.getActivePlayers();
    });
  }

}
