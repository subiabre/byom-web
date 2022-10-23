import { Server } from "socket.io";
import type { Plugin } from "vite";
import { socketRoomEvent } from "./events/socket-room-event";

export function socketio(): Plugin {
    return {
        name: 'socket-io-server',
        configureServer(server) {
            const io = new Server(server.httpServer || 3000);

            io.on('connection', async (socket) => {
                socketRoomEvent.server(socket, io);
            });
        }
    }
}