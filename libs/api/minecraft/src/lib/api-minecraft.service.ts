import { HttpException, Injectable } from '@nestjs/common';
import { match } from 'assert';
import { Client, createClient } from 'minecraft-protocol';

@Injectable()
export class ApiMinecraftService {
    clients: Set<Client>;
    port: number;
    host: string;
    users: Set<any>;
    expected_hostname = "localhost:25565"
    constructor() {
        this.clients = new Set<Client>();
        this.port = 25565;
        this.host = "192.168.0.101";
        this.users = new Set<any>([
            {
                uuid: '044d2543-7f3a-35ca-855c-40be9fd55c7e',
                ip: '/127.0.0.1',
            }
        ]);
    }
    async createClient(clientID: string): Promise<any>{
        let duplicate_bool = false;
        this.clients.forEach((client)=>{
            if(client.username === clientID){
                duplicate_bool = true;
            }
        });
        if(duplicate_bool)
            return new HttpException(`Player with username ${clientID} has already been added!`, 400);
        const newClient = createClient({
            username: clientID,
            host: this.host,
            port: this.port || 25565,
        });
        newClient.on('systemChat', async (data) => {
            let json_data;
            try{
                json_data = JSON.parse(data.formattedMessage);
                if(json_data?.translate === 'sleep.players_sleeping'){
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
        let matched = false;
        this.clients.forEach((client)=>{
            if(client.username === id){
                matched = true;
                client.end();
                this.clients.delete(client);
            }
        });
        if(!matched)
            return false;
        else
            return true;
    }
    async setHost(newHost: string){
        this.host = newHost;
    }
    async setPort(newPort: number){
        this.port = newPort;
    }
    async authenticate(uuid: string, ip: string, hostname: string){
        if(hostname !== this.expected_hostname)
            return false;
        let matched = false;
        this.users.forEach((user)=>{
            if(user.uuid === uuid && user.ip === ip)
                matched = true;
        })
        return matched;
    }
}
