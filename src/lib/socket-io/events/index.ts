import type { Server, Socket as ServerSocket } from "socket.io";
import type { Socket as ClientSocket } from "socket.io-client";

export abstract class ClientEvent {
    abstract listen(socket: ClientSocket): void;
}

export abstract class ServerEvent {
    abstract io(io: Server): ServerEventListener;
}

export interface ServerEventListener {
    listen(socket: ServerSocket): void
}
