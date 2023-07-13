import { HttpException, Injectable } from '@nestjs/common';
import { Client, createClient } from 'minecraft-protocol';

@Injectable()
export class ApiMinecraftService {
    clients: Set<Client>;
    port: number;
    host: string;
    constructor() {
        this.clients = new Set<Client>();
        this.port = 25565;
        this.host = "192.168.0.101";
    }
    async createClient(clientID: string): Promise<any>{
        this.clients.forEach((client)=>{
            if(client.username == clientID){
                return new HttpException(`Player with username ${clientID} has already been added!`, 400);
            }
        })
        const newClient = createClient({
            username: clientID,
            host: this.host,
            port: this.port || 25565,
        });
        newClient.on('systemChat', async (data) => {
            let json_data;
            try{
                json_data = JSON.parse(data.formattedMessage);
                if(json_data?.translate == 'sleep.players_sleeping'){
                    newClient.end();
                    this.clients.delete(newClient);
                    await new Promise(resolve => setTimeout(resolve, 10000));
                    this.createClient(newClient.username);
                }
            }
            catch(e){
                console.log(e);
            }
        });
        newClient.on('end', ()=>{
            this.clients.delete(newClient);
        })
        this.clients.add(newClient);
        return true;
    }
    async getActiveClients(): Promise<Array<string>> {
        const activeClients = new Array<string>();
        this.clients.forEach((client)=>{
            activeClients.push(client.username);
        })
        return activeClients;
    }
    async removeClient(id: string): Promise<boolean>{
        this.clients.forEach((client)=>{
            if(client.username == id){
                client.end();
                this.clients.delete(client);
                return true;
            }
        });
        return false;
    }
    async setHost(newHost: string){
        this.host = newHost;
    }
    async setPort(newPort: number){
        this.port = newPort;
    }
}
