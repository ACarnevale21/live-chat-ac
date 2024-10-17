import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatConnectionService {
  private users: Map<string, Socket> = new Map();

  registerUser(username: string, client: Socket) {
    this.users.set(username, client);
    console.log(`${username} se ha registrado con el socket ${client.id}`);
  }

  unregisterUser(client: Socket) {
    this.users.forEach((socket, username) => {
      if (socket.id === client.id) {
        this.users.delete(username);
        console.log(`Usuario ${username} desconectado`);
      }
    });
  }

  getUserSocket(username: string): Socket | undefined {
    return this.users.get(username);
  }
}
