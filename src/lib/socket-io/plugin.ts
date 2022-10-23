import { Server } from "socket.io";
import type { Plugin } from "vite";
import { userSigninEvent } from "./events/user-signin-event";

export function socketio(): Plugin {
    return {
        name: 'socket-io-server',
        configureServer(server) {
            const io = new Server(server.httpServer || 3000);

            io.on('connection', async (socket) => {
                userSigninEvent.server(io).listen(socket);
            });
        }
    }
}