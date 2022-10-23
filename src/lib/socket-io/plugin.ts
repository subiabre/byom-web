import { Server } from "socket.io";
import type { Plugin } from "vite";
import { userSigninHandler } from "./events/user-signin";

export function socketio(): Plugin {
    return {
        name: 'socket-io-server',
        configureServer(server) {
            const io = new Server(server.httpServer || 3000);

            io.on('connection', async (socket) => {
                userSigninHandler.io(io)(socket);
            });
        }
    }
}