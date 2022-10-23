import type { Server, Socket as ServerSocket } from "socket.io";
import type { Socket as ClientSocket } from "socket.io-client";

export interface ServerEventHandler {
    io(server: Server): (client: ServerSocket) => void;
}

export interface ClientEventHandler {
    io(client: ClientSocket): () => void;
}

export interface ClientEventEmitter {
    emit(...args: any[]): void;
}
