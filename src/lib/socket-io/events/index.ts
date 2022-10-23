import type { Server, Socket as ServerSocket } from "socket.io";
import type { Socket as ClientSocket } from "socket.io-client";

export interface SocketioEvent {
    client(client: ClientSocket): {
        listen(): void;
    },
    server(server: Server): {
        listen(client: ServerSocket): void;
    }
}
