import { HttpException, Injectable } from '@nestjs/common';
import { isEqual } from 'ip';
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
        this.users = new Set<any>();
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
        ip = ip.substring(1);
        this.users.forEach((user)=>{
            console.log("COMPARING", user.uuid, uuid, user.ip, ip);
            console.log(isEqual(user.ip, ip));
            console.log(user.uuid === "" || user.uuid === uuid);
            if((user.uuid === uuid || user.uuid === "") && isEqual(user.ip, ip)){
                matched = true;
                if(user.uuid === ""){
                    user.uuid = uuid;
                }
            }
        })
        return matched;
    }
}
