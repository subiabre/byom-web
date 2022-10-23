import type { Server, Socket as ServerSocket } from "socket.io";
import type { Socket as ClientSocket } from "socket.io-client";

export interface SocketioEvent {
    /**
     * Defines the default behaviour for this event on the client side
     * @param client The socket instance on the client side
     */
    client(client: ClientSocket): void,

    /**
     * Defines the default behaviour for this event on the server side
     * @param client The socket instance on the server side
     * @param server The socket.io server instance
     */
    server(client: ServerSocket, server: Server): void;
}
