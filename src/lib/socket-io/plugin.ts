import { Server } from "socket.io";
import type { Plugin } from "vite";
import { userSocketEvent } from "./events/user-socket-event";

export function socketio(): Plugin {
    return {
        name: 'socket-io-server',
        configureServer(server) {
            const io = new Server(server.httpServer || 3000);

            io.on('connection', async (socket) => {
                userSocketEvent.server(socket, io);
            });
        }
    }
}